import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Button,
  Card,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Clock from "./Clock";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

export default function AppointmentDetail() {
  const [isEdit, setIsEdit] = React.useState(false);
  const { appointmentId } = useParams(); // Get the appointmentId from the URL
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const [provider, setProvider] = React.useState("");
  const [providerEmail, setProviderEmail] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [updatedApp, setUpdatedApp] = React.useState({});
  const [activate, setActivate] = React.useState(null);

  const goBack = () => {
    navigate(-1);
  };

  const goUserDetail = () => {
    if (!appointment) {
      throw new Error("No appointment");
    }
    if (!appointment.customer_email){
      setError("No customer")
      navigate(0)
      return;
    }
    navigate(`/adminuserdetail/${appointment.customer_email}`);
  };

  const handleProvider = (e) => {
    setProvider(e.target.value);
  };

  const handleProviderEmail = (e) => {
    setProviderEmail(e.target.value);
  };

  const handleCustomer = (e) => {
    setCustomer(e.target.value);
  };

  const handleCustomerEmail = (e) => {
    setCustomerEmail(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.velue);
  };

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleActivate = (e) => {
    setActivate(e.target.value);
  };

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      if (!appointmentId) {
        setError("Appointment ID is missing");
        return;
      }

      try {
        const response = await fetch(
          `http://18.185.69.244:8080/getappbyid?appointmentID=${appointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
  }, []);

  const handleSave = async () => {
    if (isEdit) {
      setUpdatedApp({
        ProviderName: provider,
        providerEmail: providerEmail,
        CustomerName: customer,
        CustomerEmail: customerEmail,
        Date: date,
        StartTime: startTime,
        EndTime: endTime,
        Activate: activate,
      });
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://18.185.69.244:8080/${role}/editapp?appointmentID=${appointmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedApp),
          }
        );
        if (!response.ok) throw new Error("Appointment did not Edit!");
        setSnackbar({});
      } catch (error) {
        setError(error.message);
      }
    }
    setIsEdit(!isEdit);
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0]; // Converts to YYYY-MM-DD format for input[type="date"]
  };

  const formatTime = (date) => {
    return new Date(date).toTimeString().split(" ")[0]; // Converts to HH:MM:SS format for input[type="time"]
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (error) return <div>{error}</div>;
  if (!appointment) return <div>Loading...</div>;

  return (
    <Card className="adminAppointmentDetailCard">
      {error&&<h3>{error}</h3>}
      <br />
      <Button onClick={goBack}>BACK</Button>
      <br />
      <Clock />
      <br />
      <h3>Customer</h3>
      <TextField
        disabled={!isEdit}
        defaultValue={appointment.customer_name || "No customer information"}
        value={
          isEdit
            ? customer
            : appointment.customer_name || "No customer information"
        }
        onChange={handleCustomer}
      />
      <br />
      <br />
      <h3>Customer Email</h3>
      <TextField
        disabled={!isEdit}
        defaultValue={appointment.customer_email || "No customer information"}
        value={
          isEdit
            ? customerEmail
            : appointment.customer_email || "No customer information"
        }
        onChange={handleCustomerEmail}
      />
      <br />
      <br />
      <h3>Service Provider</h3>
      <TextField
        className="editSelectField"
        disabled={!isEdit}
        defaultValue={appointment.provider_name || "No provider"}
        value={isEdit ? provider : appointment.provider_name || "No provider"}
        onChange={handleProvider}
      ></TextField>
      <br />
      <br />
      <h3>Service Provider Email</h3>
      <TextField
        className="editSelectField"
        disabled={!isEdit}
        defaultValue={appointment.provider_email || "No provider"}
        value={
          isEdit ? providerEmail : appointment.provider_email || "No provider"
        }
        onChange={handleProviderEmail}
      ></TextField>
      <br />
      <br />
      <h3>Services</h3>
      <TextField
        className="editSelectField"
        disabled
        select
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
        disabled={!isEdit}
        className="editSelectField"
        type="date"
        defaultValue={formatDate(appointment.date)}
        value={isEdit ? date : formatDate(appointment.date)}
        onChange={handleDate}
      />
      <br />
      <br />
      <h3>Start Time</h3>
      <TextField
        disabled={!isEdit}
        className="editSelectField"
        type="time"
        defaultValue={formatTime(appointment.start_time)}
        value={isEdit ? startTime : formatTime(appointment.start_time)}
        onChange={handleStartTime}
      />
      <br />
      <br />
      <TextField
        disabled={!isEdit}
        className="editSelectField"
        type="time"
        defaultValue={formatTime(appointment.end_time)}
        value={isEdit ? endTime : formatTime(appointment.end_time)}
        onChange={handleEndTime}
      />
      <br />
      <br />
      <h3>Activate</h3>
      <TextField
        select
        className="editSelectField"
        disabled={!isEdit}
        defaultValue={appointment.activate}
        value={isEdit ? activate : appointment.activate}
        onChange={handleActivate}
      >
        <MenuItem key={1} id="activate" value={true}>
          Active
        </MenuItem>
        <MenuItem key={0} id="activate" value={false}>
          Inactive
        </MenuItem>
      </TextField>
      <br />
      <br />
      <Box>
        <br />
        <Button color="secondary" variant="contained" onClick={handleSave}>
          {isEdit ? "Save" : "Edit Appointment"}
        </Button>
        {isEdit ? (
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            {" "}
            Cancel
          </Button>
        ) : (
          <Box />
        )}
        <br />
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
