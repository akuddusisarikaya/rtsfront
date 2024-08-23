import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Card, MenuItem, TextField } from "@mui/material";
import Clock from "./Clock";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function AppointmentEdit() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const [currentTime, setCurrentTime] = useState(new Date());

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
      <TextField label="Alice Armstrong" />
      <br></br>
      <br></br>
      <h3>Service Provider</h3>
      <TextField className="editSelectField" select label=" Provider #1">
        <MenuItem>Provider #1</MenuItem>
        <MenuItem>Provider #2</MenuItem>
      </TextField>
      <br></br>
      <br></br>
      <h3>Date</h3>
      <TextField
        className="editSelectField"
        type="date"
        label={formatDate(currentTime)}
      />
      <br></br>
      <br></br>
      <h3>Time </h3>
      <TextField
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
        <Button variant="contained" onClick={goBack}>
          Save
        </Button>
      </Box>
    </Card>
  );
}
