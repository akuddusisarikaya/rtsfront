import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ManagerProfileContent() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const goLinkCreat = () => {
    nav("/adminlinkcreate");
  };

  return (
    <Box>
      <h3 style={{ textAlign:"center" }}>Manager Profile</h3>
      <br/>
      <br/>
      <Button
        color="secondary"
        variant="contained"
        onClick={goLinkCreat}
        fullWidth
      >Create Link</Button>
      <br/>
      <br/>
      <Card className="adminProfileCard">
        <br />
        <h5>Name:</h5>
        <h4>{user.name}</h4>
        <br />
        <h5>Company Name:</h5>
        <h4>{user.company_name}</h4>
        <br />
        <h5>eMail:</h5>
        <h4>{user.email}</h4>
        <br />
        <h5>Phone Number:</h5>
        <h4>{user.phone}</h4>
        <br />
      </Card>
    </Box>
  );
}
