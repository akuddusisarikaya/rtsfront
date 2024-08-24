import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Card, MenuItem, TextField } from "@mui/material";
import Clock from "./Clock";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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

export default function AppointmentEdit() {
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

  const goBack = () => {
    navigate(-1);
  };

  const handleServiceChange = (event) => {
    setSelectedServices(event.target.value);
  };
  return (
    <Card className="adminAppointmentDetailCard">
      <br></br>
      <Button color="secondary" onClick={goBack}>BACK</Button>
      <br></br>
      <Clock />
      <br></br>
      <h3>Customer</h3>
      <TextField label="Alice Armstrong" />
      <br></br>
      <br></br>
      <h3>Service Provider</h3>
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
      <h3>Services</h3>
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
      <br></br>
      <br></br>
      <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h3>Date</h3>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <br></br>
                <br></br>
                <h3>Time</h3>
                <TimePicker
                  label="Time"
                  value={currentTime}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
      <br></br>
      <br></br>
      <br></br>
      <Box>
        <br></br>
        <br></br>
        <Button color="secondary" variant="contained" onClick={goBack}>
          Save
        </Button>
      </Box>
    </Card>
  );
}
