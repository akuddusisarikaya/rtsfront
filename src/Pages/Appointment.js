import React, { useEffect, useState } from "react";
import "../App.css";
import dayjs from "dayjs";
import { Box, Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
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

export default function Appointment() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedServices, setSelectedServices] = useState([]);
  const [provider, setProvider] = useState("");
  const [formData, setFormData] = useState({ name: "", surname: "", email: "", phone: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const backClick = () => {
    navigate("/");
  };

  const handleServiceChange = (event) => {
    setSelectedServices(event.target.value);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleProviderChange = (event) => {
    setProvider(event.target.value);
  };

  const handleSubmit = async () => {
    const appointmentData = {
      customer_id: `${formData.name} ${formData.surname}`, // Örneğin isim ve soyisim ile id'yi oluşturduk
      provider_id: provider,
      company_id: "example_company_id", // Şirket bilgisi burada sabit veya seçilebilir olabilir
      services: selectedServices,
      date: selectedDate.toISOString(),
      status: "pending",
      notes: "Any special requests or notes here", // Kullanıcıdan alınabilir
    };

    try {
      const response = await fetch("http://localhost:8080/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Appointment created successfully!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: "Failed to create appointment.", severity: "error" });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setSnackbar({ open: true, message: "An error occurred while creating the appointment.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const submitAndBack = () => {
    handleSubmit();
    navigate(-1);
  }

  return (
    <div>
      <br />
      <Button color="secondary" onClick={backClick}>
        BACK
      </Button>
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
              value={formData.name}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              required
              id="surname"
              label="Surname"
              className="appointmentTextField"
              value={formData.surname}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              required
              id="email"
              type="email"
              label="E-mail"
              className="appointmentTextField"
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              required
              id="phone"
              label="Phone Number"
              className="appointmentTextField"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              required
              select
              className="appointmentTextField"
              id="provider"
              label="Select Service Provider"
              value={provider}
              onChange={handleProviderChange}
            >
              {providers.map((option) => (
                <MenuItem key={option.key} value={option.name}>
                  {option.name}
                </MenuItem>
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
                <br />
                <br />
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
            <Button
              color="secondary"
              variant="contained"
              className="appointmentButton"
              onClick={submitAndBack}
            >
              Done
            </Button>
          </div>
          <br />
          <br />
          <br />
        </Box>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

