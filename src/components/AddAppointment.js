import * as React from "react";
import "../App.css";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { Box, Button, TextField, MenuItem, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import NewDatePicker from "./NewDatePicker";
import NewTimePicker from "./NewTimePicker";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function AddAppointment() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [error, setError] = React.useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const [providers, setProviders] = React.useState([]);
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [selectedStartTime, setSelectedStartTime] = React.useState(dayjs());
  const [selectedEndTime, setSelectedEndTime] = React.useState(dayjs());
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const [selectedServices, setSelectedServices] = React.useState([]);
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1);
  };

  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
  };

  const handleCustomerEmail = (e) => {
    setCustomerEmail(e.target.value);
  };

  const handleCustomerPhone = (e) => {
    setCustomerPhone(e.target.value);
  };

  const handleSelectedStartTime = (newTime) => {
    setSelectedStartTime(newTime);
  };

  const handleSelectedEndTime = (newTime) => {
    setSelectedEndTime(newTime);
  };

  const handleSelectedDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSelectedProvider = (e) => {
    setSelectedProvider(e.target.value);
  };

  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedServices(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(() => {
    if (role === "provider") {
      setSelectedProvider(user);
      return;
    }
    const fetchProviders = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/${role}/getproviders?companyId=${user.company_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Providers did not catch");
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProviders();
  }, []);

  const sumbitAppointment = async () => {
    if (role === "provider") {
      if (customerName === null || customerName.length < 3) {
        setError("Customer Name not valid");
        return;
      } else if (customerEmail === null || customerEmail.length < 8) {
        setError("Customer Email not valid");
        return;
      } else if (customerPhone === null || customerPhone.length < 9) {
        setError("Customer Phone not valid");
        return;
      }
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/provider/createapp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              provider_name: user.name,
              provider_email: user.email,
              provider_phone: user.phone,
              customer_name: customerName,
              customer_email: customerEmail,
              customer_phone: customerPhone,
              company_name: user.company_name,
              company_id: user.company_id,
              date: selectedDate,
              start_time: selectedStartTime,
              end_time: selectedEndTime,
              services: selectedServices,
              activate: true,
            }),
          }
        );
        if (!response.ok) throw new Error("Appoinment did not add");
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/${role}/createapp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              provider_name: selectedProvider.name,
              provider_email: selectedProvider.email,
              provider_phone: selectedProvider.phone,
              customer_name: customerName,
              customer_email: customerEmail,
              customer_phone: customerPhone,
              company_name: selectedProvider.company_name,
              company_id: selectedProvider.company_id,
              date: selectedDate,
              start_time: selectedStartTime,
              end_time: selectedEndTime,
              services: selectedServices,
              activate: true,
            }),
          }
        );
        if (!response.ok) throw new Error("Appoinment did not add");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <Box>
      <Box className="appointmentBox">
        <Button color="secondary" onClick={backClick}>
          BACK
        </Button>
        <h1 style={{ marginTop: "5%" }}>Appointment</h1>
        <br />
        {error && <h5>{error}</h5>}
        <Box component="form" autoComplete="off">
          <Box>
            <TextField
              required
              id="name"
              label="Name"
              className="appointmentTextField"
              onChange={handleCustomerName}
            />
            <br />
            <br />
            <TextField
              required
              id="email"
              type="email"
              label="E-mail"
              className="appointmentTextField"
              onChange={handleCustomerEmail}
            />
            <br />
            <br />
            <TextField
              required
              id="phone"
              label="Phone"
              className="appointmentTextField"
              onChange={handleCustomerPhone}
            />
            {role !== "provider" && (
              <Box>
                <br />
                <br />
                <TextField
                  required
                  select
                  value={selectedProvider}
                  className="appointmentTextField"
                  label="Select Service Provider"
                  onChange={handleSelectedProvider}
                >
                  {providers.map(
                    (provider) =>
                      provider.role !== "SuperUser" && (
                        <MenuItem key={provider.id} value={provider}>
                          {provider.name}
                        </MenuItem>
                      )
                  )}
                </TextField>
              </Box>
            )}
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
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={isMobile ? 12 : 6}></Grid>
              <Grid item xs={isMobile ? 12 : 6}>
                <Item>
                  <h4>Select Date</h4>
                  <NewDatePicker
                    onDateChange={handleSelectedDate}
                  ></NewDatePicker>
                </Item>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={isMobile ? 12 : 6}>
                <Item>
                  <h4>Start Time:</h4>
                  <NewTimePicker onTimeChange={handleSelectedStartTime} />
                </Item>
              </Grid>
              <Grid item xs={isMobile ? 12 : 6}>
                <Item>
                  <h4>End Time:</h4>
                  <NewTimePicker onTimeChange={handleSelectedEndTime} />
                </Item>
              </Grid>
            </Grid>
            <br />
            <br />
            <Button
              color="secondary"
              variant="contained"
              className="appointmentButton"
              onClick={sumbitAppointment}
            >
              Done
            </Button>
          </Box>
          <br />
          <br />
          <br />
        </Box>
      </Box>
    </Box>
  );
}
