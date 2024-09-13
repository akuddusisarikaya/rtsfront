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
  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    const provider = JSON.parse(sessionStorage.getItem("provider"))
    let role = {}
    if(!admin){
      role = admin
    }else {
      role = provider
    }
    const getProviders = async () => {

      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${role.CompanyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }

        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }
    };

      getProviders();
  }, []); // company değiştiğinde yalnızca bu efekt çalışır.

  // Services verisini optimize edilmiş şekilde göster, gereksiz render işlemlerini önlemek için useMemo kullanıldı.
  const renderedServices = React.useMemo(() => {
    return providers.flatMap((provider) => {
      const services = provider.Services || [];
      return services.slice(0, 5).map((serv, index) => (
        <ListItem key={`${provider.ID}-${index}`}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText secondary={provider.Name} primary={serv} />
        </ListItem>
      ));
    });
  }, [providers]);

  const goList = () => {
    nav("/adminservicelist");
  };

  const listClassSize = size === "large" ? "listSizeLarge" : "listSizeSmall";

  return (
    <Box className={listClassSize}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <h3>Services</h3>
        {/*{error && <h5>{error}</h5>}*/}
        {renderedServices}
        <br />
        <Button color="secondary" variant="contained" onClick={goList}>
          See Others
        </Button>
      </List>
    </Box>
  );
}
