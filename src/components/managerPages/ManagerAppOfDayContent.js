import * as React from "react";
import "../../App.css";
import NewDatePicker from "../NewDatePicker";
import Box from "@mui/material/Box";
import {
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ManagerAppOfDayContent() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const token = sessionStorage.getItem("token");
  const [providers, setProviders] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState(user);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [appointments, setAppointments] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const nav = useNavigate();

  const handleDateChange = (newdate) => {
    setSelectedDate(newdate);
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const formedTime = (time) => {
    return dayjs(time).utc().format("HH:mm");
  };
  const goBack = () => {
    nav(-1);
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  const goEdit = () => {
    nav("/managerworkdays")
  }

  React.useEffect(() => {
    if (role === "provider") return;
    const fetchProviders = async () => {
      setLoading(true);
      setError(null);
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
        if (!response.ok) {
          throw new Error("Providers did not catch");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [role]);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedDate) return;
      setLoading(true);
      setError(null);

      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const email = selectedProvider.email;

        const response = await fetch(
          `http://localhost:8080/${role}/getappointments?email=${email}&date=${formattedDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Randevular alınamadı");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError("Randevu verisi alınırken hata oluştu: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [selectedDate, selectedProvider]);

  return (
    <Box className="appoftoday">
      <Button color="secondary" onClick={goBack} style={{margin:"2%"}} >Back</Button>
      <Button color="secondary" variant="contained" onClick={goEdit} style={{marginLeft:"60%"}} > Edit</Button>
      <NewDatePicker onDateChange={handleDateChange} />

      <TextField
        select
        style={{ width: "30%" }}
        label="Provider"
        variant="outlined"
        onChange={handleProviderChange}
      >
        {providers !== null ? (
          providers.map(
            (prov, index) =>
              (prov.role === "Provider" || prov.role === "Manager") && (
                <MenuItem key={index} value={prov}>
                  {prov.name}
                </MenuItem>
              )
          )
        ) : (
          <MenuItem disabled>No Providers Available</MenuItem>
        )}
      </TextField>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Card sx={{ marginTop: 2 }}>
        {appointments === null ? (
          <CardContent>
            <Typography>
              No appointments available for the selected date.
            </Typography>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="h6">Appointments:</Typography>
            <List>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <ListItem key={appointment.ID}>
                    <ListItemText
                      primary={`Appointment: ${formedTime(
                        appointment.start_time
                      )} - ${formedTime(appointment.end_time)}`}
                      secondary={`Status: ${
                        appointment.activate
                          ? `Active Customer: ${appointment.customer_email}`
                          : "Inactive"
                      }`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>
                  No appointments available for the selected date.
                </Typography>
              )}
            </List>
          </CardContent>
        )}
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
