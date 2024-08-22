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
      <div className="loginBox">
        <h1 style={{ marginTop: "15%" }}> Login </h1>
        <br></br>
        <br></br>
        <br></br>
        <TextField
          id="email-phone"
          label="Email or Phone Number"
          variant="outlined"
          className="loginTextField"
        />
        <br></br>
        <br></br>
        <br></br>
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          className="loginTextField"
        />
        <br></br>
        <br></br>
        <Button onClick={passwordReset} className="loginButton">
          Forget Pasword?
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" className="loginButton">
          {" "}
          Login
        </Button>
      </div>
    </div>
  );
}
export default Login;
