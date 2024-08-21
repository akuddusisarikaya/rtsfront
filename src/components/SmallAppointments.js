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
    time: "Today 11.00",
  },
  {
    key: 2,
    name: "Austin Arnord",
    time: "Today 13.00",
  },
  {
    key: 3,
    name: "Amelia Adams",
    time: "Today 14.00",
  },
  {
    key: 4,
    name: "Alice Abbott",
    time: "Today 15.00",
  },
  {
    key: 5,
    name: "Abigail Armstrong",
    time: "Today 16.00",
  },
];

export default function SmallAppointments() {

  const navigate = useNavigate()

  const detailClick = () => {
    navigate('/adminmanappointments')
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3>Appointments</h3>
      {providers.map((provider) => (
        <ListItem key={provider.key}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={provider.name} secondary={provider.time} />
        </ListItem>
      ))}
      <Button variant="contained" onClick={detailClick}>See Others</Button>
    </List>
  );
}
