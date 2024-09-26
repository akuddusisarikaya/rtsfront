import * as React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

export default function SmallServicesForProvider() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const services = user.services;

  const nav = useNavigate();
  const goList = () => {
    nav("/providerservicelist");
  };

  return (
    <Box>
      <List sx={{ width: "100%", textAlign: "center" , bgcolor: "background.paper" }}>
        <h3>Services</h3>
        {services !== null ? (
          services.map((service) =>
            service === "BoşServis - ₺000" ? (
              <br />
            ) : (
              <ListItem key={service.key}>
                <ListItemText sx={{textAlign:"center"}} key={service.index} primary={service} />
              </ListItem>
            )
          )
        ) : (
          <br />
        )}
        <br></br>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={goList}
        >
          See Others
        </Button>
      </List>
    </Box>
  );
}
