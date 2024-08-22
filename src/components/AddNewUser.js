import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { Avatar, Button, CardActions, MenuItem, TextField } from "@mui/material";
import Card from "@mui/material/Card";

const roles = [
  {
    value:"Manager",
    label:"Manager"
  },
  {
    value:"User",
    label:"User"
  }
]

export default function AddNewUser() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Card className="userDetailCard">
        <br></br>
      <Button onClick={goBack}>Back</Button>
      <Avatar className="userDetailAvatar"></Avatar>
      <CardContent>
        <TextField  label="Name"></TextField>
        <br></br>
        <br></br>
        <TextField select className="editSelectField" label="Role">
        {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <br></br>
        <TextField  label="eMail"></TextField>
        <br></br>
        <br></br>
        <TextField  label="Phone Number"></TextField>
        <br></br>
        <br></br>
        <TextField  type="password" label="Password"></TextField>
      </CardContent>
      <CardActions>
        <Button onClick={goBack}>Save</Button>
      </CardActions>
    </Card>
  );
}
