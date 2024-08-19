import * as React from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const backClick = () => {
    navigate('/')
  }
  const passwordReset = () => {
    navigate("/resetpassword");
  };
  return (
    <div>
      <Button onClick={backClick} > BACK </Button>
      <div style={{ marginLeft: "30%" }}>
        <h1 style={{ marginTop: "15%" }}> Login </h1>
        <br></br>
        <br></br>
        <br></br>
        <TextField
          id="email-phone"
          label="Email or Phone Number"
          variant="outlined"
          style={{ width: "30%" }}
        />
        <br></br>
        <br></br>
        <br></br>
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          style={{ width: "30%" }}
        />
        <br></br>
        <br></br>
        <Button color="secondary" onClick={passwordReset}>
          Forget Pasword?
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" color="secondary" style={{ width: "30%" }}>
          {" "}
          Login
        </Button>
      </div>
    </div>
  );
}
export default Login;