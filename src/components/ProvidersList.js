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
  {
    key: 6,
    name: "Alice Allen",
    title: "Aesthetician",
  },
  {
    key: 7,
    name: "Austin Arnord",
    title: "Nutritionist",
  },
  {
    key: 8,
    name: "Amelia Adams",
    title: "Aesthetician",
  },
  {
    key: 9,
    name: "Alice Abbott",
    title: "Nutritionist",
  },
  {
    key: 10,
    name: "Abigail Armstrong",
    title: "Aesthetician",
  },
];

export default function ProviderList() {
  
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);
  };
  const goDetails = () =>{
    navigate('/adminuserdetail')
  }

  
  return (
    <Box>
      <br></br>
      <Button color="secondary" onClick={goBack} >Back</Button>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
      <h3 style={{marginLeft:"35%"}}>Service Providers</h3>
      {providers.map((provider) => (
        <ListItem key={provider.key} style={{ marginTop: "5px"}}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={provider.name} secondary={provider.title} />
          <Button color="secondary" variant="contained" onClick={goDetails}>See Details</Button>
        </ListItem>
      ))}
    </List>
    </Box>
    
  );
}
