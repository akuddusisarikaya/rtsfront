import * as React from "react";
import "../App.css";
import dayjs from "dayjs";
import { Box, Button, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const providers = [
  {
    key: 1,
    name: "Adam Smith",
  },
  {
    key: 2,
    name: "Alice Lincoln",
  },
  {
    key: 3,
    name: "Joe Deer",
  },
];

function Appointment() {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <div>
      <h1 style={{ marginTop: "5%" }}>Appointment</h1>
      <br></br>
      <Box component="form" autoComplate="off">
        <div>
          <TextField required id="name" label="Name" style={{ width: "25%" }} />
          <br></br>
          <br></br>
          <TextField
            required
            id="surname"
            label="Surname"
            style={{ width: "25%" }}
          />
          <br></br>
          <br></br>
          <TextField
            required
            id="email"
            type="email"
            label="E-mail"
            style={{ width: "25%" }}
          />
          <br></br>
          <br></br>
          <TextField
            required
            id="phone"
            label="Phone Number"
            style={{ width: "25%" }}
          />
          <br></br>
          <br></br>
          <TextField
            required
            select
            style={{ width: "25%" }}
            id="provider"
            label="Select Service Provider"
            SelectProps={{
              native: true,
            }}
          >
            {providers.map((option) => (
              <option key={option.key} value={option.name}>
                {option.name}
              </option>
            ))}
          </TextField>
          <br></br>
          <br></br>
          <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
                <TimePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
            </LocalizationProvider>
          </div>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "30%", marginBottom: "10%" }}
          >
            {" "}
            Done
          </Button>
        </div>
      </Box>
    </div>
  );
}
export default Appointment;
