import * as React from "react";
import "../../App.css";
import { Button, Card, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

export default function UserSettings() {
  return (
    <div>
        <br></br>
        <br></br>
      <h3 style={{ marginLeft: "5%" }}>User Settings</h3>
      <Card className="adminProfileCard">
        <br></br>
        <h3>Profile Informations</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <TextField variant="standard" label="Name :"></TextField>
        <br></br>
        <TextField variant="standard" label="Phone:"></TextField>
        <br></br>
        <TextField variant="standard" label="eMail:" type="mail"></TextField>
        <br></br>
        <br></br>
        <h3> Notification Preferences</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <h3>Notification:</h3>
        <FormControlLabel control={<Checkbox color="secondary" />} label="SMS" />
        <FormControlLabel control={<Checkbox color="secondary" />} label="eMail" />
        <br></br>
        <br></br>
        <h3>Language and Region</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <br></br>
        <TextField
          className="editSelectField"
          select
          label="Language"
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          className="editSelectField"
          select
          label="Region"
        ></TextField>
        <br></br>
        <br></br>
        <br></br>
        <h3>Security</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <Box style={{ marginLeft: "15%" }}>
          <Button color="secondary" variant="contained">Number Verification</Button>
          <br></br>
          <br></br>
          <Button color="secondary" variant="contained">eMail Verification</Button>
        </Box>
      </Card>
    </div>
  );
}
