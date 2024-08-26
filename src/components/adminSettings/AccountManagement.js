import * as React from "react";
import '../../App.css'
import {Button, Card, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function AccountManagement() {
  return (
    <div>
      <br></br>
      <br></br>
      <h3 style={{ marginLeft: "5%" }}>Account Management</h3>
      <Card className="adminProfileCard">
        <br></br>
        <h3>Subscription Plan</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <h5>Your Plan:</h5>
        <TextField disabled defaultValue={"Basic Plan"}></TextField>
        <Button color="secondary" style={{marginLeft :"5%"}}> For Change </Button>
        <br></br>
        <br></br>
        <h3>Invoice Information</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <TextField label="Your Adress:" defaultValue={"(Your adress info)"} ></TextField>
        <br></br>
        <br></br>
        <TextField label="Your Tax Number:" defaultValue={"(Your tax number info)"}></TextField>
        <br></br>
        <br></br>
        <h3>Backup and Restore</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <Box>
          <Button color="secondary" variant="contained">Backup</Button> <Button color="secondary" variant="contained">Restore</Button>
        </Box>
        <br></br>
      </Card>
    </div>
  );
}
