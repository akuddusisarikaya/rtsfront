import * as React from "react";
import "../App.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PasswordReset(params) {
  
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
  
  return (
    <div>
      <br></br>
      <Button onClick={goBack}> BACK</Button>
      <div className="resetpassBox">
        <h1 style={{ marginTop: "15%" }}>Reset Pasword</h1>
        <br></br>
        <br></br>
        <TextField
          id="resetpassword"
          label="Email or Phone Number"
          variant="outlined"
          className="resetpassTextField"
        ></TextField>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" className="resetButton">
          {" "}
          Reset Password
        </Button>
      </div>
    </div>
  );
}
export default PasswordReset;
