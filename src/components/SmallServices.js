import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

export default function SmallServices({ size }) {
  const [error, setError] = React.useState(null);
  const [providers, setProviders] = React.useState([]);
  const nav = useNavigate();
  const goList = () => {
    nav("/adminservicelist");
  };
  const listClassSize = size === "large" ? "listSizeLarge" : "listSizeSmall";

  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    const getProviders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${admin.CompanyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Providers did not catch");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getProviders();
  }, []);

  return (
    <Box className={listClassSize}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <h3>Services</h3>
        {error && <h5>{error}</h5>}
        {providers.map((provider) => {
          const services = provider.Services || [];
          return services.slice(0,5).map((serv, index) => (
            <ListItem key={`${provider.ID}-${index}`}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={provider.Name} secondary={serv} />
            </ListItem>
          ));
        })}
        <br />
        <Button color="secondary" variant="contained" onClick={goList}>
          See Others
        </Button>
      </List>
    </Box>
  );
}
