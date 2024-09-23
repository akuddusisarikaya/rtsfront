import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

export default function ProviderProfileContent() {
  const provider = JSON.parse(sessionStorage.getItem("user"))

  return (
    <Box>
      <h3 style={{ textAlign:"center" }}>Provider Profile</h3>
      <Card className="adminProfileCard">
        <br />
        <h5>Name:</h5>
        <h4>{provider.name}</h4>
        <br />
        <h5>Company Name:</h5>
        <h4>{provider.company_name}</h4>
        <br />
        <h5>eMail:</h5>
        <h4>{provider.email}</h4>
        <br />
        <h5>Phone Number:</h5>
        <h4>{provider.phone}</h4>
        <br />
      </Card>
    </Box>
  );
}
