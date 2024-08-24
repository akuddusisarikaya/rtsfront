import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Button, CardActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserDetail() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const editPerson = () => {
    navigate("/adminuserdetailedit");
  };

  return (
    <Card className="userDetailCard">
      <br></br>
      <Button color="secondary" onClick={goBack}>Back</Button>
      <Avatar className="userDetailAvatar"></Avatar>
      <CardContent>
        <h1>Adam Smith</h1>
        <h4>Aesthetician</h4>
        <br></br>
        <br></br>
        <h3>Name:</h3>
        <TextField disabled label="Adam Smith"></TextField>
        <br></br>
        <h3>Role:</h3>
        <TextField disabled label="Aesthetician"></TextField>
        <br></br>
        <h3>E-mail:</h3>
        <TextField disabled label="adamsmith@example.com"></TextField>
        <br></br>
        <h3>Phone:</h3>
        <TextField disabled label="+90 555 444 33 22"></TextField>
        <br></br>
        <h3>Password</h3>
        <TextField disabled type="password" label="*********"></TextField>
      </CardContent>
      <CardActions>
        <Button color="secondary" onClick={editPerson}>Edit</Button>
      </CardActions>
    </Card>
  );
}
