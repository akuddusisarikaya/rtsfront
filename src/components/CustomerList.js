import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
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

export default function CustomerList() {
    const navigate = useNavigate()
    const goBack = () =>{
        navigate(-1)
    }
  return (
    <Box>
        <Button onClick={goBack}>Back</Button>
        <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
      <h3 style={{marginLeft:"35%"}}>Customers</h3>
      {providers.map((provider) => (
        <ListItem key={provider.key} style={{border : "solid 0.25px", marginTop: "1px", borderRadius:"1cap"}}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={provider.name} />
          <Button variant="contained">See Details</Button>
        </ListItem>
      ))}
    </List>
    </Box>
    
  );
}
