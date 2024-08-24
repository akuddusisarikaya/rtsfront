import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Button,
  CardActions,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const roles = [
  {
    value: "Manager",
    label: "Manager",
  },
  {
    value: "User",
    label: "User",
  },
];
export default function EditUser() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
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
        <TextField label="Adam Smith"></TextField>
        <br></br>
        <h3>Role:</h3>
        <TextField select label="Aesthetician" className="editSelectField">
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <h3>E-mail:</h3>
        <TextField label="adamsmith@example.com"></TextField>
        <br></br>
        <h3>Phone:</h3>
        <TextField label="+90 555 444 33 22"></TextField>
        <br></br>
        <h3>Password</h3>
        <TextField type="password" label="*********"></TextField>
      </CardContent>
      <CardActions>
        <Button color="secondary" onClick={goBack}>Save</Button>
      </CardActions>
    </Card>
  );
}
