import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const managers = [
  {
    key: 1,
    name: "Alice Allen",
    title: "Manager"
  },
  {
    key: 2,
    name: "Austin Arnord",
    title: "Manager"
  },
  {
    key: 3,
    name: "Amelia Adams",
    title: "Manager"
  },
];

export default function SmallProviders() {

  const navigate = useNavigate()

  const detailClick = () => {
    navigate('/adminmanagerslist')
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3>Managers</h3>
      {managers.map((manager) => (
        <ListItem key={manager.key}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={manager.name} secondary={manager.title}/>
        </ListItem>
      ))}
      <Button color="secondary" variant="contained" onClick={detailClick}>See Others</Button>
    </List>
  );
}
