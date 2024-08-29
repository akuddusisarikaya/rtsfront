import * as React from "react";
import "../App.css";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

function NumberVerification(params) {
  return (
    <Box>
      <h1 >Verificate Your Number</h1>
      <br></br>
      <br></br>
      <Box className="verBox">
        <TextField
          id="smscode"
          label="SMS Code"
          variant="outlined"
          className="verButton"
        />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" color="error" className="verButton">
          {" "}
          Send SMS Again
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" color="secondary" className="verButton">
          {" "}
          Verificate
        </Button>
      </Box>
    </Box>
  );
}
export default NumberVerification;
