import * as React from "react";
import "../App.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import NewDatePicker from "../components/NewDatePicker";

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = "Europe/Istanbul";

export default function Appointment() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { companyID } = useParams(); // URL'den companyID alınıyor
  const [showTimes, setShowTimes] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo] = React.useState([]); // Başlangıç değeri boş dizi olmalı
  const [selectedProvider, setSelectedProvider] = React.useState("");
  const [appointments, setAppointments] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [selectedCompany, setSelectedCompany] = React.useState({});
  const [selectedAppointment, setSelectedAppointment] = React.useState({});

  React.useEffect(() => {
    if (!companyID) {
      const fetchCompanies = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch("http://localhost:8080/getallcompanies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch companies");
          }
          const data = await response.json();
          setCompanies(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCompanies();
    }
  }, [companyID]);

  const formedTime = (time) => {
    return dayjs(time).tz(TIMEZONE).format("HH:mm");
  };

  React.useEffect(() => {
    const fetchProviderInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${selectedCompany.ID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Providers did not catch");
        }
        const data = await response.json();
        setProviderInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProviderInfo();
  }, [selectedCompany]);

  React.useEffect(() => {
    if (companyID) {
      setSelectedCompany(companyID);
    }
  }, [companyID]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleSelectedDate = (newDate) => setSelectedDate(newDate);

  const fetchAppointments = async () => {
    if (!providerInfo) return;
    setLoading(true);
    setError(false);
    try {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await fetch(
        `http://localhost:8080/getprovidersapp?providerEmail=${selectedProvider.Email}&date=${formattedDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Appointments did not catch");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowTime = () => {
    setShowTimes(!showTimes);
    fetchAppointments();
  };

  const backClick = () => navigate("/");

  const handleServiceChange = (event) =>
    setSelectedServices(event.target.value);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleProviderChange = (event) =>
    setSelectedProvider(event.target.value);

  const handleSubmit = async () => {
    const appointmentData = {
      customer_email: formData.email, // Daha iyi bir ID yapısı için kullanıcı adı kullanılıyor
      provider_id: selectedProvider.ID, // Seçilen provider id'si
      company_id: selectedCompany.ID, // companyID URL'den alınıyor
      services: selectedServices,
      date: selectedDate.toISOString(),
      activate: true,
      notes: "Any special requests or notes here", // Notlar kullanıcıdan alınabilir
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
        setSnackbar({
          open: true,
          message: "Appointment created successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to create appointment.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while creating the appointment.",
        severity: "error",
      });
    }
  };
  const handleSelectedAppointment = (e) => {
    setSelectedAppointment(e)
  }

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const submitAndBack = async () => {
    await handleSubmit();
    navigate(-1);
  };

  return (
    <div>
      <br />
      <Button
        style={{ marginLeft: "5%" }}
        color="secondary"
        onClick={backClick}
      >
        BACK
      </Button>
      <div className="appointmentBox">
        <h1 style={{ marginTop: "5%", marginLeft: "10%" }}>Appointment</h1>
        {loading && <h5>Loading</h5>}
        {error && <h5>{error}</h5>}
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
            {!companyID && (
              <Box>
                <TextField
                  required
                  select
                  className="appointmentTextField"
                  label="Select Company"
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                >
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <MenuItem key={company.ID} value={company}>
                        {company.Name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Companies Available</MenuItem>
                  )}
                </TextField>
                <br />
                <br />
              </Box>
            )}
            <TextField
              required
              select
              className="appointmentTextField"
              id="provider"
              label="Select Service Provider"
              value={selectedProvider}
              onChange={handleProviderChange}
            >
              {providerInfo !== null ? (
                providerInfo.map((provider) => (
                  <MenuItem key={provider} value={provider}>
                    {provider.Name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Providers Available</MenuItem>
              )}
            </TextField>
            <br />
            <br />
            <TextField
              required
              select
              className="appointmentTextField"
              id="services"
              label="Select Services"
              SelectProps={{
                multiple: true,
                value: selectedServices,
                onChange: handleServiceChange,
                renderValue: (selected) => selected.join(", "),
              }}
            >
              {Array.isArray(selectedProvider.Services) &&
              selectedProvider.Services !== null ? (
                selectedProvider.Services.map((service) => (
                  <MenuItem key={service.key} value={service.name}>
                    {`${service.name} - ${service.price}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <p>Services Not Found</p>
                </MenuItem>
              )}
            </TextField>
            <br />
            <br />
            <Box style={{ width: "40%" }}>
              <NewDatePicker onDateChange={handleSelectedDate} />
            </Box>
            <br />
            <br />
            <Button
              color="secondary"
              variant="contained"
              style={{ width: "40%" }}
              onClick={handleShowTime}
            >
              {showTimes ? "Close" : "Select Appointment"}
            </Button>
            {showTimes && (
              <Box>
                <br />
                {appointments !== null ? (
                  appointments.map((appointment) => (
                    <Box>
                      <Button
                        key={appointment.ID}
                        value={appointment}
                        variant="contained"
                        color="secondary"
                        onClick={()=> {handleSelectedAppointment(appointment)}}
                      >
                        {`${formedTime(appointment.StartTime)} - ${formedTime(
                          appointment.EndTime
                        )}`}
                      </Button>
                      <br />
                      <br />
                    </Box>
                  ))
                ) : (
                  <Box>
                    <h4>Appointment has not found! </h4>
                  </Box>
                )}
                <br />
              </Box>
            )}
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
