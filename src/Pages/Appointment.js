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

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = "Europe/Istanbul";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Appointment() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { companyID } = useParams();
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
  const [providerInfo, setProviderInfo] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState("");
  const [appointments, setAppointments] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [selectedCompany, setSelectedCompany] = React.useState({});
  const [selectedAppointment, setSelectedAppointment] = React.useState({});
  const user = React.useMemo(() => JSON.parse(sessionStorage.getItem("user")), []);

  const formedTime = (time) => dayjs(time).tz(TIMEZONE).format("HH:mm");

  // Fetch companies or providers based on companyID
  React.useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://18.185.69.244:8080/getcompanies", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProviderInfo = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://18.185.69.244:8080/getproviders?companyId=${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch providers");
        const data = await response.json();
        setProviderInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!companyID) {
      fetchCompanies();
    } else {
      fetchProviderInfo(companyID);
    }
  }, []);

  // Fetch provider info when selected company changes
  React.useEffect(() => {
    if (selectedCompany.id) {
      const fetchProviderInfo = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://18.185.69.244:8080/getproviders?companyId=${selectedCompany.id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch providers");
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
  }, []);

  // Fetch appointments when provider or date changes
  React.useEffect(() => {
    if (selectedProvider.email && selectedDate) {
      const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
          const formattedDate = selectedDate.format("YYYY-MM-DD");
          const response = await fetch(
            `https://18.185.69.244:8080/getproviderappall?providerEmail=${selectedProvider.email}&date=${formattedDate}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch appointments");
          const data = await response.json();
          setAppointments(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [selectedProvider, selectedDate]);

  // Form input change handler
  const handleInputChange = React.useCallback((event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }, []);

  // Handle provider change
  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  // Handle company change
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Handle service change
  const handleServiceChange = (event) => setSelectedServices(event.target.value);

  // Handle appointment selection
  const handleSelectedAppointment = (e) => {
    const selectedAppId = e.target.value;
    const selectedApp = appointments.find(app => app.id === selectedAppId); 
    setSelectedAppointment(selectedApp); 
  };

  // Handle date selection
  const handleSelectedDate = (newDate) => setSelectedDate(newDate);

  // Validate required fields
  const validateFields = () => {
    const requiredFields = [selectedAppointment, formData.name, formData.email];
    return requiredFields.every((field) => field && field.length > 0);
  };

  // Handle form submission
  const handleSubmit = async () => {
    /*if (!validateFields()) {
      setSnackbar({
        open: true,
        message: "All fields must be filled correctly.",
        severity: "error",
      });
      return;
    }*/

    const appointmentDetails = {
      customer_name: user ? user.name : formData.name,
      customer_email: user ? user.email : formData.email,
      services: selectedServices,
      activate: true,
    };
    try {
      const response = await fetch(
        `https://18.185.69.244:8080/activateapp?appointmentID=${selectedAppointment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentDetails),
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Appointment created successfully!",
          severity: "success",
        });
        // Navigate back only if submission is successful
        await wait(2000);
        navigate(-1);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to create appointment.",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "An error occurred while creating the appointment.",
        severity: "error",
      });
    }
  };

  return (
    <div>
      <br />
      <Button style={{ marginLeft: "5%" }} color="secondary" onClick={() => navigate(-1)}>
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
              value={user ? user.Name : formData.name}
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
              value={user ? user.Email : formData.email}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              required
              id="phone"
              label="Phone Number"
              className="appointmentTextField"
              value={user ? user.Phone : formData.phone}
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
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company}>
                      {company.name}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
              </Box>
            )}
            <TextField
              required
              select
              value={selectedProvider}
              className="appointmentTextField"
              label="Select Service Provider"
              onChange={handleProviderChange}
            >
              {providerInfo.map((provider) => (
                provider.role !== "SuperUser" &&
                <MenuItem key={provider.id} value={provider}>
                  {provider.name}
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
              label="Select Services"
              SelectProps={{
                multiple: true,
                value: selectedServices,
                onChange: handleServiceChange,
                renderValue: (selected) => selected.join(", "),
              }}
            >
              {selectedProvider.services?.map((service) => (
                <MenuItem key={service.key} value={service}>
                  {service !== "BoşServis - ₺000" && service}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <Box style={{ width: "40%" }}>
              <NewDatePicker onDateChange={handleSelectedDate} />
            </Box>
            <br />
            <br />
            <FormControl>
              <RadioGroup value={selectedAppointment.id} onChange={handleSelectedAppointment}>
                {appointments !== null ? (
                  appointments.map((appointment) => (
                    <FormControlLabel
                      key={appointment.id}
                      value={appointment.id}
                      control={<Radio />}
                      label={`${formedTime(appointment.start_time)}-${formedTime(appointment.end_time)}`}
                    />
                  ))
                ):(
                  <Box/>
                )
                }
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <Button color="secondary" variant="contained" className="appointmentButton" onClick={handleSubmit}>
              Done
            </Button>
          </div>
        </Box>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
