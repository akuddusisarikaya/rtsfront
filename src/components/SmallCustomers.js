import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const providers = [
  {
    key: 1,
    name: "Alice Allen",
  },
  {
    key: 2,
    name: "Austin Arnord",
  },
  {
    key: 3,
    name: "Amelia Adams",
  },
  {
    key: 4,
    name: "Alice Abbott",
  },
  {
    key: 5,
    name: "Abigail Armstrong",
  },
];

export default function SmallCostumers() {

  const navigate = useNavigate()

  const detailClick = () => {
    navigate('/adminmancustomers')
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3>Customers</h3>
      {providers.map((provider) => (
        <ListItem key={provider.key}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={provider.name} />
        </ListItem>
      ))}
      <Button color="secondary" variant="contained" onClick={detailClick}>See Others</Button>
    </List>
  );
}
