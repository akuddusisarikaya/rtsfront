import * as React from "react";
import "../App.css";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

function NumberVerification(params) {

  //const user = JSON.parse(sessionStorage.getItem("user"))
  
  return (
    <Box>
      <br />
      <br />
      <br />
      <Box className="verBox">
        <TextField
          id="smscode"
          label="SMS Code"
          variant="outlined"
          className="verButton"
        />
        <br></br>
        <br></br>
        <Button variant="contained" color="secondary" className="verButton">
          Confirm
        </Button>
        <br></br>
        <br></br>
        <Button color="error" className="verButton">
          Send SMS Again
        </Button>
      </Box>
    </Box>
  );
}
export default NumberVerification;
