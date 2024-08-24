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

export default function ManagersList() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const editPerson = () => {
    navigate("/adminuserdetail");
  };
  return (
    <Box>
      <br></br>
      <Button color="secondary" onClick={goBack}>Back</Button>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
        <h3 style={{ marginLeft: "35%" }}>Managers</h3>
        {managers.map((manager) => (
          <ListItem
            key={manager.key}
            style={{
              marginTop: "10px",
            }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={manager.name} secondary={manager.title} />
            <Button color="secondary" onClick={editPerson} variant="contained">
              See Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
