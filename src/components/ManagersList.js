import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AdminDrawer from "./adminPages/AdminDrawer";
import ManagerDrawer from "./managerPages/ManagerDrawer";

export default function ManagersList() {
  const navigate = useNavigate();
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [providers, setProviders] = React.useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/${role}/getproviders?companyId=${user.company_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  const goDetails = () => {
    navigate("/adminuserdetail");
  };

  return (
    <Box>
      {role === "admin" ? <AdminDrawer/> : <ManagerDrawer/>}
      <Box className="dashboardNotMobile">
        <br></br>
        <Button color="secondary" onClick={goBack}>
          Back
        </Button>
        <List
          sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}
        >
          <h3 style={{ marginLeft: "35%" }}>Managers</h3>
          {error && <h5> {error} </h5>}
          {providers.map(
            (provider) =>
              provider.role === "Manager" && (
                <Box>
                  <ListItem key={provider.key} style={{ marginTop: "5px" }}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={provider.name}
                      secondary={`${provider.phone}  /  ${provider.email}`}
                    />
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        setDetailOpen(!detailOpen);
                      }}
                    >
                      {detailOpen ? "Close" : "See Details"}
                    </Button>
                  </ListItem>
                  {detailOpen && (
                    <Card>
                      <ListItem>
                        <ListItemText primary={`Name: ${provider.name}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Email: ${provider.email}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Phone: ${provider.phone}`} />
                        <Button
                          onClick={() => {
                            navigate(`/edituser/${provider.email}`);
                          }}
                        >
                          Edit Provider
                        </Button>
                      </ListItem>
                    </Card>
                  )}
                </Box>
              )
          )}
        </List>
      </Box>
    </Box>
  );
}
