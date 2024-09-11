import * as React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const payments = [
    {
      key: 1,
      name: "Adam Smith",
      price: "$100"
    },
    {
      key: 2,
      name: "Harper Reed",
      price: "$50"
    },
    {
      key: 3,
      name: "Salvador Dali",
      price: "$200"
    },
    {
      key: 4,
      name: "Al Pachino",
      price: "$350"
    },
  ];

export default function SmallPayments(){
    const nav = useNavigate()

    const goList = () => {
        nav('/adminpaymentlist')
    }
    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <h3>Payments</h3>
          {payments.map((payment) => (
            <ListItem key={payment.key}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={payment.name} secondary={payment.price} />
            </ListItem>
          ))}
          <Button color="secondary" variant="contained" onClick={goList}>See Others</Button>
        </List>
      );
}