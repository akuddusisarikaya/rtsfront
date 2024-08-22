import * as React from "react";
import "../App.css";
import dayjs from "dayjs";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";

const providers = [
  {
    key: 0,
    name: "---Select a Provider---",
  },
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

  const navigate = useNavigate();

  const backClick = () => {
    navigate("/");
  };

  return (
    <div>
      <br></br>
      <Button onClick={backClick}>BACK</Button>
      <div className="appointmentBox">
        <h1 style={{ marginleft: "20%", marginTop: "5%" }}>Appointment</h1>
        <br></br>
        <Box component="form" autoComplate="off">
          <div>
            <TextField
              required
              id="name"
              label="Name"
              className="appointmentTextField"
            />
            <br></br>
            <br></br>
            <TextField
              required
              id="surname"
              label="Surname"
              className="appointmentTextField"
            />
            <br></br>
            <br></br>
            <TextField
              required
              id="email"
              type="email"
              label="E-mail"
              className="appointmentTextField"
            />
            <br></br>
            <br></br>
            <TextField
              required
              id="phone"
              label="Phone Number"
              className="appointmentTextField"
            />
            <br></br>
            <br></br>
            <TextField
              required
              select
              className="appointmentTextField"
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
            <div>
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
              className="appointmentButton"
            >
              {" "}
              Done
            </Button>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </Box>
      </div>
    </div>
  );
}
export default Appointment;
