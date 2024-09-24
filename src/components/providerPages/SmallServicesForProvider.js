import * as React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box"

export default function SmallServicesForProvider({ size }) {
    let services = [];
  try {
    services = JSON.parse(sessionStorage.getItem("services")) || [];
  } catch (error) {
    console.error("Failed to parse services:", error);
  }

  const nav = useNavigate();
  const goList = () => {
    nav("/providerservicelist");
  };
  const listClassSize = size === "large" ? "listSizeLarge" : "listSizeSmall";

  return (
    <Box className={listClassSize}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <h3>Services</h3>
        {services.map((service) => (
          <ListItem key={service.key}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText key={service.index} primary={service.service} secondary={service.price} />
          </ListItem>
        ))}
        <br></br>
        <Button fullWidth color="secondary" variant="contained" onClick={goList}>
          See Others
        </Button>
      </List>
    </Box>
  );
}
