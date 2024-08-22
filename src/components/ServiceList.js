import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

const services = [
  {
    key: 1,
    name: "Service#1",
    price: "$100"
  },
  {
    key: 2,
    name: "Service#2",
    price: "$50"
  },
  {
    key: 3,
    name: "Service#3",
    price: "$200"
  },
  {
    key: 4,
    name: "Service#4",
    price: "$350"
  },
];

export default function ServiceList() {
  const navigate = useNavigate()

  const goDetails = () => {
    navigate('/adminservicedetails')
  }

  return (
    <Box>
      <br></br>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
        <h3 style={{ marginLeft: "35%" }}>Services</h3>
        {services.map((service) => (
          <ListItem
            key={service.key}
            style={{
              border: "solid 0.25px",
              marginTop: "1px",
              borderRadius: "1cap",
            }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={service.name} secondary={service.price}/>
            <Button onClick={goDetails} variant="contained">See Details</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
