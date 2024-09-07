import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box"

const services = [
  {
    key: 1,
    name: "Service#1",
    price: "$100",
  },
  {
    key: 2,
    name: "Service#2",
    price: "$50",
  },
  {
    key: 3,
    name: "Service#3",
    price: "$200",
  },
  {
    key: 4,
    name: "Service#4",
    price: "$350",
  },
];

export default function SmallServices({ size }) {
  const nav = useNavigate();
  const goList = () => {
    nav("/adminservicelist");
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
            <ListItemText primary={service.name} secondary={service.price} />
          </ListItem>
        ))}
        <br></br>
        <Button color="secondary" variant="contained" onClick={goList}>
          See Others
        </Button>
      </List>
    </Box>
  );
}
