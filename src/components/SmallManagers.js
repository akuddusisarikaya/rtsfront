import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SmallManagers() {

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

  const detailClick = () => {
    navigate('/adminmanagerslist')
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3>Managers</h3>
      {error&& <h5>{error}</h5>}
      {managers.slice(0,5).map((manager) => (
        <ListItem key={manager.key}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={manager.Name}/>
        </ListItem>
      ))}
      <Button color="secondary" variant="contained" onClick={detailClick}>See Others</Button>
    </List>
  );
}
