import * as React from "react";
import "../App.css";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

export default function EmailVerification(params) {
  return (
    <Box>
      <h1>Verificate Your Email</h1>
      <br></br>
      <br></br>
      <Box className="verBox">
        <TextField
          id="emailcode"
          label="eMail Code"
          variant="outlined"
          className="verButton"
        />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" color="error" className="verButton">
          {" "}
          Send Email Again
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
