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
  const [selectedAppointment, setSelectedAppointment] = React.useState("");
  const user = React.useMemo(() => JSON.parse(sessionStorage.getItem("user")), []);

  // Şirketleri çekme işlemi
  React.useEffect(() => {
    if (!companyID) {
      const fetchCompanies = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch("http://localhost:8080/getallcompanies", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
              headers: { "Content-Type": "application/json" },
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
  }, [selectedCompany.ID]);

  // Randevuları çekme işlemi
  React.useEffect(() => {
    if (selectedProvider.Email && selectedDate) {
      const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
          const formattedDate = selectedDate.format("YYYY-MM-DD");
          const response = await fetch(
            `http://localhost:8080/getprovidersapp?providerEmail=${selectedProvider.Email}&date=${formattedDate}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
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
    }
  }, [selectedProvider, selectedDate])

  const formedTime = (time) => {
    return dayjs(time).tz(TIMEZONE).format("HH:mm");
  };

  // Form girdisi değişimini yönetme
  const handleInputChange = React.useCallback((event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }, []);

  // Sağlayıcı değişimini yönetme
  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  // Şirket değişimini yönetme
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Servis değişimini yönetme
  const handleServiceChange = (event) => setSelectedServices(event.target.value);

  const handleSelectedAppointment = (e) => setSelectedAppointment(e.target.value);

  const handleSelectedDate = (newDate) => setSelectedDate(newDate);

  const handleSubmit = async () => {
    const appointmentDetails = {
      customer_name: user ? user.Name : formData.name,
      customer_email: user ? user.Email : formData.email,
      Services: selectedServices,
      Activate: true,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/updateapp?appointmentID=${selectedAppointment}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentDetails),
        }
      );

      if (response.ok) {
        setSnackbar({ open: true, message: "Appointment created successfully!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: "Failed to create appointment.", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "An error occurred while creating the appointment.", severity: "error" });
    }
  };

  const submitAndBack = async () => {
    await handleSubmit();
    wait(2000)
    navigate(-1);
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
                    <MenuItem key={company.ID} value={company}>
                      {company.Name}
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
              className="appointmentTextField"
              id="provider"
              label="Select Service Provider"
              value={selectedProvider}
              onChange={handleProviderChange}
            >
              {providerInfo.map((provider) => (
                <MenuItem key={provider.ID} value={provider}>
                  {provider.Name}
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
              {selectedProvider.Services?.map((service) => (
                <MenuItem key={service.key} value={service}>
                  {service}
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
              <RadioGroup value={selectedAppointment} onChange={handleSelectedAppointment}>
                { appointments!==null? (appointments.map((appointment) => (
                  <FormControlLabel
                    key={appointment.ID}
                    value={appointment.ID}
                    control={<Radio />}
                    label={`${formedTime(appointment.StartTime)}-${formedTime(appointment.EndTime)}`}
                  />
                ))):(
                  <Box/>
                )}
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <Button color="secondary" variant="contained" className="appointmentButton" onClick={submitAndBack}>
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
