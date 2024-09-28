import * as React from "react";
import "../App.css";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

export default function EmailVerification(params) {
  const [error, SetError] = React.useState(null)
  const [user, setUser] = React.useState({});
  const [code, setCode] = React.useState("");


  React.useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const submitVer = async () => {
    const userId = user.ID;
    try {
      const response = await fetch(
        `http://18.185.69.244:8080/veremailCode?userID=${userId}&code=${code}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(!response.ok) throw new Error("Error sending verification code");
    } catch (error) {
      SetError(error)
    }
  };

  return (
    <Box>
      <br />
      <br />
      <br />
      <Box className="verBox">
        {error&& <h3>{error}</h3>}
        <TextField
          id="emailcode"
          label="eMail Code"
          variant="outlined"
          className="verButton"
          onChange={handleCode}
        />
        <br></br>
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          className="verButton"
          onClick={submitVer}
        >
          Confirm
        </Button>
        <br></br>
        <br></br>
        <Button color="error" className="verButton">
          Send Email Again
        </Button>
      </Box>
    </Box>
  );
}
