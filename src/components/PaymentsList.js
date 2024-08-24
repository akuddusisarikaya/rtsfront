import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

const payments = [
  {
    key: 1,
    name: "Adam Smith",
    price: "$100",
    isDone: "Done"
  },
  {
    key: 2,
    name: "Harper Reed",
    price: "$50",
    isDone: "Undone"
  },
  {
    key: 3,
    name: "Salvador Dali",
    price: "$200",
    isDone: "Done"
  },
  {
    key: 4,
    name: "Al Pachino",
    price: "$350",
    isDone: "Undone"
  },
];

export default function PaymentsList() {
  const nav = useNavigate();

  const goBack = () => {
    nav(-1);
  };
  return (
    <Box>
      <br></br>
      <Button color="secondary" onClick={goBack}>Back</Button>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
        <h3 style={{ marginLeft: "35%" }}>Payments</h3>
        {payments.map((payment) => (
          <ListItem
            key={payment.key}
            style={{
              marginTop: "5px",
            }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={payment.name} secondary={`${payment.price} - ${payment.isDone}`} />
            <Button color="secondary" variant="contained">
              See Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
