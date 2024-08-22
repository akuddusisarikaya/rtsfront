import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Card, Button, TextField, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";

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

export default function EditService() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Box className="serviceDetailBox">
      <br></br>
      <br></br>
      <Card className="serviceDetailCard">
        <br></br>
        <Button onClick={goBack}> BACK</Button>
        <br></br>
        <h1>Service#1</h1>
        <br></br>
        <h3>Service Name: </h3>
        <TextField  label=" Service #1"></TextField>
        <br></br>
        <h3> For: </h3>
        <TextField  select className="editSelectField" label="Manager">
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <h3> Price: </h3>
        <TextField  label="$100"></TextField>
        <br></br>
        <br></br>
        <Button variant="contained" className="serviceEditSaveButton" onClick={goBack}> Save </Button>
      </Card>
    </Box>
  );
}
