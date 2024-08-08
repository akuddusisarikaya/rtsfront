import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const providers = [
  {
    key: 1,
    name: "Alice Allen",
    title: "Aesthetician",
  },
  {
    key: 2,
    name: "Austin Arnord",
    title: "Nutritionist",
  },
  {
    key: 3,
    name: "Amelia Adams",
    title: "Aesthetician",
  },
  {
    key: 4,
    name: "Alice Abbott",
    title: "Nutritionist",
  },
  {
    key: 5,
    name: "Abigail Armstrong",
    title: "Aesthetician",
  },
];

export default function SmallProviders() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
       {providers.map((provider) => (
        <ListItem key={provider.key}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={provider.name} secondary={provider.title} />
        </ListItem>
      ))}
    </List>
  );
}
