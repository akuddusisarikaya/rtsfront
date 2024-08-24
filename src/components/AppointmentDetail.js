import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Card, MenuItem, TextField } from "@mui/material";
import Clock from "./Clock";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function AppointmentDetail() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goUserDetail = () => {
    navigate("/adminuserdetail");
  };
  const [currentTime, setCurrentTime] = useState(new Date());
  const goEdit = () => {
    navigate("/adminappointmentedit");
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <Card className="adminAppointmentDetailCard">
      <br></br>
      <Button onClick={goBack}>BACK</Button>
      <br></br>
      <Clock />
      <br></br>
      <h3>Customer</h3>
      <TextField disabled label="Alice Armstrong" />
      <br></br>
      <br></br>
      <h3>Service Provider</h3>
      <TextField
        className="editSelectField"
        disabled
        select
        label=" Provider #1"
      >
        <MenuItem>Provider #1</MenuItem>
        <MenuItem>Provider #2</MenuItem>
      </TextField>
      <br></br>
      <br></br>
      <h3>Services</h3>
      <TextField
        className="editSelectField"
        disabled
        select
        label=" Service #1"
      >
      </TextField>
      <br></br>
      <br></br>
      <h3>Date</h3>
      <TextField
        disabled
        className="editSelectField"
        type="date"
        label={formatDate(currentTime)}
      />
      <br></br>
      <br></br>
      <h3>Time </h3>
      <TextField
        disabled
        className="editSelectField"
        type="time"
        label={formatTime(currentTime)}
      />
      <br></br>
      <br></br>
      <br></br>
      <Box>
        <br></br>
        <br></br>
        <Button color="secondary" variant="contained" onClick={goEdit}>
          Edit Appointment
        </Button>
        <br></br>
        <br></br>
        <Button color="secondary" variant="contained" onClick={goUserDetail}>
          View Customer's Detail
        </Button>
      </Box>
    </Card>
  );
}
