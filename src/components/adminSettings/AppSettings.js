import * as React from "react";
import "../../App.css";
import { Card, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AppSettings() {
  return (
    <div>
      <br></br>
      <br></br>
      <h3 style={{ marginLeft: "5%" }}>App Settings</h3>
      <br></br>
      <Card className="adminProfileCard">
        <br></br>
        <h3>Working Hours</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <h4>Monday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h4>Tuesday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h4>Wednesday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h4>Thursday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h4>Friday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h4>Saturday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h4>Sunday:</h4> <TextField label={"From:"} defaultValue={"00:00"} />
        <TextField label={"To:"} defaultValue={"00:00"} />{" "}
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label={"Open"}
        ></FormControlLabel>
        <br></br>
        <h3>Service Category</h3>
        <Divider style={{ marginRight: "5%" }} />
        <br></br>
        <TextField
          select
          className="appointmentTextField"
          defaultValue={"Education"}
          SelectProps={{
            native: true,
          }}
        >
          <option>Aesthetician</option>
          <option>Dietician</option>
          <option>Dentist</option>
          <option>PT</option>
          <option>Education</option>
        </TextField>
      </Card>
    </div>
  );
}
