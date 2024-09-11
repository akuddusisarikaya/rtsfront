import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function ManagersList() {
  const [error, setError] = React.useState(null);
  const [managers, setManagers] = React.useState([]);

  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    if (!admin) return;
    const fetchManagers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/admin/getmanagerbycompany?companyID=${admin.CompanyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Managers did not catch");
        }
        const data = await response.json();
        setManagers(data);
        console.log(managers);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchManagers();
  },[]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const editPerson = () => {
    navigate("/adminuserdetail");
  };
  return (
    <Box>
      <br></br>
      <Button color="secondary" onClick={goBack}>
        Back
      </Button>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
        <h3 style={{ marginLeft: "35%" }}>Managers</h3>
        {error && <h5>{error}</h5>}
        {managers.map((manager) => (
          <ListItem
            key={manager.key}
            style={{
              marginTop: "10px",
            }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={manager.Name} />
            <Button color="secondary" onClick={editPerson} variant="contained">
              See Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
