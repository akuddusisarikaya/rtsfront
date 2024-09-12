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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import NewDatePicker from "../components/NewDatePicker";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = "Europe/Istanbul";

export default function Appointment() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { companyID } = useParams(); // URL'den companyID alınıyor
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
  const [appointmentData, setAppointmentData] = React.useState({
    customer_name: "",
    customer_email: "",
    Services: "",
    Activate: null,
  });
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo] = React.useState([]); // Başlangıç değeri boş dizi olmalı
  const [selectedProvider, setSelectedProvider] = React.useState("");
  const [appointments, setAppointments] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [selectedCompany, setSelectedCompany] = React.useState({});
  const [selectedAppointment, setSelectedAppointment] = React.useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Şirketleri çekme işlemi
  React.useEffect(() => {
    if (!companyID) {
      const fetchCompanies = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            "http://localhost:8080/getallcompanies",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
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

  // Sağlayıcı bilgilerini çekme işlemi
  React.useEffect(() => {
    if (selectedCompany.ID) {
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
            throw new Error("Failed to fetch providers");
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
    }
  });

  // Seçili şirketi ayarlama
  React.useEffect(() => {
    if (companyID) {
      setSelectedCompany(companyID);
    }
  },[]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleSelectedDate = (newDate) => setSelectedDate(newDate);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedProvider.Email) return;
      setLoading(true);
      setError(null);
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
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [selectedProvider, selectedDate]);
  // Geri butonu yönetimi
  const backClick = () => navigate("/");

  // Servis değişimini yönetme
  const handleServiceChange = (event) =>
    setSelectedServices(event.target.value);

  // Form girdisi değişimini yönetme
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Sağlayıcı değişimini yönetme
  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  React.useEffect(()=>{
    const control = () =>{
      if (user === null) {
        if (!formData.name) {
          setError("İsim bilgisi eksik");
          return;
        }
        if (!formData.email) {
          setError("Email bilgisi eksik");
          return;
        }
        if (!formData.phone) {
          setError("Telefon bilgisi eksik");
          return;
        }
        setAppointmentData({
          customer_name: formData.name,
          customer_email: formData.email,
          Services: selectedServices,
          Activate: true,
        });
      } else {
        setAppointmentData({
          customer_name: user.Name,
          customer_email: user.Email,
          Services: selectedServices,
          Activate: true,
        });
      }
    }
    control()
  })

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/updateapp?appointmentID=${selectedAppointment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

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

  // Seçili randevuyu yönetme
  const handleSelectedAppointment = (e) => {
    setSelectedAppointment(e.target.value);
    console.log(selectedAppointment);
  };

  // Snackbar kapama işlemi
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Randevu gönderme ve geri dönme
  const submitAndBack = async () => {
    await handleSubmit();
    await wait(2000)
    navigate(0)
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
              value={user !== null ? user.Name : formData.name}
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
              value={user !== null ? user.Email : formData.email}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              required
              id="phone"
              label="Phone Number"
              className="appointmentTextField"
              value={user !== null ? user.Phone : formData.phone}
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
              {providerInfo.length > 0 ? (
                providerInfo.map((provider) => (
                  <MenuItem key={provider.ID} value={provider}>
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
              selectedProvider.Services.length !== null ? (
                selectedProvider.Services.map((service) => (
                  <MenuItem key={service.key} value={service}>
                    {service}
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
            <Box>
              <br />
              <FormControl>
                <RadioGroup
                  value={selectedAppointment}
                  onChange={handleSelectedAppointment}
                >
                  {appointments !== null ? (
                    appointments.map((appointment) => (
                      <FormControlLabel
                        key={appointment.ID}
                        value={appointment.ID}
                        control={<Radio />}
                        label={`${formedTime(
                          appointment.StartTime
                        )}-${formedTime(appointment.EndTime)}`}
                      />
                    ))
                  ) : (
                    <h3>
                      <p>Appointment not found!</p>
                    </h3>
                  )}
                </RadioGroup>
              </FormControl>
              <br />
            </Box>

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
