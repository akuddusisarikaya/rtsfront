import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box"

export default function SmallProviders() {
  const [error, setError] = React.useState(null);
  const [providers, setProviders] = React.useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"))

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const role = user.role.toLowerCase();
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://3.71.9.9:8080/${role}/getproviders?companyId=${user.company_id}`,
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

  const navigate = useNavigate();

  const detailClick = () => {
    navigate("/providerslist");
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <h3>Service Providers</h3>
      {error && <h5>{error}</h5>}
      {providers !== null ? (
        providers.slice(0, 5).map((provider) => (
          provider.role === "Provider"&&
          <ListItem key={provider.key}>
            <ListItemText
              sx={{textAlign:"center"}}
              primary={provider.name}
              secondary={`${provider.phone}  /  ${provider.email}`}
            />
          </ListItem>
        ))
      ) : (
        <Box />
      )}
      <br/>
      <Button fullWidth color="secondary" variant="contained" onClick={detailClick}>
        See Others
      </Button>
    </List>
  );
}
