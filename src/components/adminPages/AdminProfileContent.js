import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";
export default function AdminProfileContent() {
  return (
    <Box>
      <h1 style={{ marginLeft: "5%" }}>AdminProfile</h1>
      <Card className="adminProfileCard">
        <PersonIcon fontSize="large" className="adminProfilePerson" />
        <br></br>
        <h3>Name:</h3>
        <h2>AdminName</h2>
        <br></br>
        <h3>Company Name:</h3>
        <h2>CompanyName</h2>
        <br></br>
        <h3>eMail:</h3>
        <h2>randomEmail</h2>
        <br></br>
        <h3>Phone Number:</h3>
        <h2>randomPhoneNumber</h2>
        <br></br>
        <h3>Managers Numbers: </h3>
        <h2>randomNumber7</h2>
        <br></br>
        <h3>Providers Number : </h3>
        <h2>randomNumber2</h2>
        <br></br>
        <h3>Advisor:</h3>
        <h2>randomName </h2>
        <h2> randomPhoneNumber</h2>
        <br></br>
      </Card>
    </Box>
  );
}
