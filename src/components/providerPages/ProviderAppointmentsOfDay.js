import * as React from "react";
import "../../App.css";
import NewDatePicker from "../NewDatePicker";
import Box from "@mui/material/Box";
import {
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useNavigate } from "react-router-dom";
dayjs.extend(utc);
dayjs.extend(timezone);
//const TIMEZONE = "Europe/Istanbul";

export default function ProviderAppointmentsOfDay() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [appointments, setAppointments] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const nav = useNavigate();

  const handleDateChange = (newdate) => {
    setSelectedDate(newdate)
  }
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const formedTime = (time) => {
    return dayjs(time).utc().format("HH:mm");
  };
  const goBack = () => {
    nav(-1)
  }
  const goEdit = () => {
    nav("/providerworkingdates")
  }

  React.useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedDate) return;
      setLoading(true);
      setError(null);

      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const token = sessionStorage.getItem("token");
        const email = user.email;

        const response = await fetch(
          `http://3.123.49.33:8080/provider/getappointments?email=${email}&date=${formattedDate}`,
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
  }, [selectedDate]);

  return (
    <Box className="appoftoday">
      <Button color="secondary" onClick={goBack} style={{margin:"2%"}} >Back</Button>
      <Button color="secondary" variant="contained" onClick={goEdit} style={{marginLeft:"60%"}} > Edit</Button>
      <NewDatePicker onDateChange={handleDateChange} />
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
                  <ListItem key={appointment.id} >
                    <ListItemText
                      primary={`Appointment: ${formedTime(
                        appointment.start_time
                      )} - ${formedTime(appointment.end_time)}`}
                      secondary={`Status: ${
                        appointment.activate
                          ? `Active - Customer: ${appointment.customer_name}`
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
