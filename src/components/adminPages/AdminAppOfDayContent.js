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
const TIMEZONE = "Europe/Istanbul";

export default function AdminAppOfDayContent() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [providers, setProviders] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState({});
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
    return dayjs(time).tz(TIMEZONE).format("HH:mm");
  };
  const goBack = () => {
    nav(-1);
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  React.useEffect(() => {
    if (!admin) return;
    const fetchProviders = async () => {
      if (!admin || !admin.CompanyID) {
        return;
      }
      setLoading(true)
      setError(null)

      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${admin.CompanyID}`,
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
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false)
      }
    };
    fetchProviders();
  }, []);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedDate) return;
      setLoading(true);
      setError(null);

      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const token = sessionStorage.getItem("token");
        const email = selectedProvider.Email;
        console.log(email, formattedDate)

        const response = await fetch(
          `http://localhost:8080/admin/getappointments?email=${email}&date=${formattedDate}`,
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
  }, [selectedDate, selectedProvider.Email]);

  return (
    <Box className="appoftoday">
      <Button color="secondary" onClick={goBack} style={{ margin: "2%" }}>
        Back
      </Button>
      <NewDatePicker onDateChange={handleDateChange} />
     
      <TextField select style={{width:"30%"}} label="Provider" variant="outlined"  onChange={handleProviderChange}>
        {providers !== null ? (
          providers.map((prov, index) => (
            <MenuItem key={index} value={prov}>
              {prov.Name}
            </MenuItem>
          ))
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
                        appointment.StartTime
                      )} - ${formedTime(appointment.EndTime)}`}
                      secondary={`Status: ${
                        appointment.activate
                          ? `Active Customer: ${appointment.CustomerEmail}`
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