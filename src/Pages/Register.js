import * as React from "react";
import "../App.css";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const backClick = () => {
    navigate("/");
  };
  return (
    <div>
      <br></br>
      <Button onClick={backClick}>BACK</Button>
      <div className="registerBox">
        <h1 style={{ marginTop: "5%" }}>Register</h1>
        <br></br>
        <br></br>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="registerDiv">
            <TextField
              required
              className="registerTextField"
              id="name-required"
              label="Name"
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="surname-required"
              label="Surname"
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="email-required-input"
              label="e-Mail"
              type="email"
            />
            <br></br>
            <br></br>
            <TextField
              required
              className="registerTextField"
              id="outlined-number"
              label="Number"
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="password-required"
              label="Password"
              type="password"
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="password-again-required"
              label="Password Again"
              type="password"
            />
            <br></br>
            <br></br>
          </div>
          <br></br>
          <Button variant="contained" className="registerButton">
            Register
          </Button>
        </Box>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
export default Register;
