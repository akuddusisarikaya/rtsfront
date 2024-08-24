import React, { useEffect, useState } from "react";
import "../App.css";
import dayjs from "dayjs";
import { Box, Button, TextField, MenuItem } from "@mui/material";
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

const services = [
  {
    key: 1,
    name: "Service#1",
    price: "$100",
  },
  {
    key: 2,
    name: "Service#2",
    price: "$50",
  },
  {
    key: 3,
    name: "Service#3",
    price: "$200",
  },
  {
    key: 4,
    name: "Service#4",
    price: "$350",
  },
];

function Appointment() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1);
  };

  const handleServiceChange = (event) => {
    setSelectedServices(event.target.value);
  };

  return (
    <div>
      <br />
      <Button color="secondary" onClick={backClick}>BACK</Button>
      <div className="appointmentBox">
        <h1 style={{ marginTop: "5%" }}>Appointment</h1>
        <br />
        <Box component="form" autoComplete="off">
          <div>
            <TextField
              required
              id="name"
              label="Name"
              className="appointmentTextField"
            />
            <br />
            <br />
            <TextField
              required
              id="surname"
              label="Surname"
              className="appointmentTextField"
            />
            <br />
            <br />
            <TextField
              required
              id="email"
              type="email"
              label="E-mail"
              className="appointmentTextField"
            />
            <br />
            <br />
            <TextField
              required
              id="phone"
              label="Phone Number"
              className="appointmentTextField"
            />
            <br />
            <br />
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
            <br />
            <br />
            <TextField
              required
              select
              className="appointmentTextField"
              id="services"
              label="Select services"
              SelectProps={{
                multiple: true,
                value: selectedServices,
                onChange: handleServiceChange,
                renderValue: (selected) => selected.join(", "),
              }}
            >
              {services.map((service) => (
                <MenuItem key={service.key} value={service.name}>
                  {`${service.name} - ${service.price}`}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <br></br>
                <br></br>
                <TimePicker
                  label="Time"
                  value={currentTime}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <br />
            <br />
            <Button color="secondary" variant="contained" className="appointmentButton">
              Done
            </Button>
          </div>
          <br />
          <br />
          <br />
        </Box>
      </div>
    </div>
  );
}
export default Appointment;
