import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Card, MenuItem, TextField, Snackbar, Alert } from "@mui/material";
import Clock from "./Clock";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

export default function AppointmentDetail() {
  const { appointmentId } = useParams(); // Get the appointmentId from the URL
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const goBack = () => {
    navigate(-1);
  };

  const goUserDetail = () => {
    navigate("/adminuserdetail", { state: { customerId: appointment?.customer_id } });
  };

  const goEdit = () => {
    navigate("/adminappointmentedit", { state: { appointment } });
  };

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      if (!appointmentId) {
        setError("Appointment ID is missing");
        return;
      }

      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/protected/appointments?ID=${appointmentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointment details");
        }

        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        setError("An error occurred while fetching the appointment details");
        setSnackbar({ open: true, message: error.message, severity: "error" });
      }
    };

    fetchAppointmentDetail();
  }, [appointmentId]); // Use appointmentId from useParams

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]; // Converts to YYYY-MM-DD format for input[type="date"]
  };

  const formatTime = (date) => {
    return new Date(date).toTimeString().split(' ')[0]; // Converts to HH:MM:SS format for input[type="time"]
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (error) return <div>{error}</div>;
  if (!appointment) return <div>Loading...</div>;

  return (
    <Card className="adminAppointmentDetailCard">
      <br />
      <Button onClick={goBack}>BACK</Button>
      <br />
      <Clock />
      <br />
      <h3>Customer</h3>
      <TextField disabled label={appointment.customer_id || "No customer information"} />
      <br />
      <br />
      <h3>Service Provider</h3>
      <TextField
        className="editSelectField"
        disabled
        select
        label={appointment.provider_id || "No provider selected"}
      >
        {appointment.provider_id && <MenuItem>{appointment.provider_id}</MenuItem>}
      </TextField>
      <br />
      <br />
      <h3>Services</h3>
      <TextField
        className="editSelectField"
        disabled
        select
        label="Services"
        SelectProps={{
          multiple: true,
          value: appointment.services || [],
          renderValue: (selected) => selected.join(", "),
        }}
      >
        {appointment.services?.map((service, index) => (
          <MenuItem key={index} value={service}>
            {service}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <h3>Date</h3>
      <TextField
        disabled
        className="editSelectField"
        type="date"
        value={formatDate(appointment.date)}
      />
      <br />
      <br />
      <h3>Time</h3>
      <TextField
        disabled
        className="editSelectField"
        type="time"
        value={formatTime(appointment.date)}
      />
      <br />
      <br />
      <Box>
        <br />
        <Button color="secondary" variant="contained" onClick={goEdit}>
          Edit Appointment
        </Button>
        <br />
        <br />
        <Button color="secondary" variant="contained" onClick={goUserDetail}>
          View Customer's Detail
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
