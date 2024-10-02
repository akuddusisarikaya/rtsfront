import * as React from "react";
import "../../App.css";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NewDatePicker from "../NewDatePicker";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import NewTimePicker from "../NewTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useMediaQuery } from "@mui/material";
import SelectWeekdays from "../SelectWeekdays";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);
//const TIMEZONE = "Europe/Istanbul";

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
export default function AdminWorkingDayContent(){
    const nav = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isCardOpen, setIsCardOpen] = React.useState(false);
  const [selectedStartTime, setSelectedStartTime] = React.useState(null);
  const [selectedEndTime, setSelectedEndTime] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [autoAddButton, setAutoAddButton] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [weekdays, setWeekdays] = React.useState("");
  const [shiftStart, setShiftStart] = React.useState(dayjs());
  const [shiftEnd, setShiftEnd] = React.useState(dayjs());
  const [period, setPeriod] = React.useState("");

  const handleDays = (newTime) => {
    setWeekdays(newTime);
  };
  const handleShiftStart = (newTime) => {
    setShiftStart(newTime);
  };
  const handleShiftEnd = (newTime) => {
    setShiftEnd(newTime);
  };

  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddButton = () => {
    if (isCardOpen === false && autoAddButton === true) {
      setAutoAddButton(false);
    }
    setIsCardOpen(!isCardOpen);
  };

  const handleAutoAddButton = () => {
    if (autoAddButton === false && isCardOpen === true) {
      setIsCardOpen(false);
    }
    setAutoAddButton(!autoAddButton);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleStartTimeChange = (newStartTime) => {
    setSelectedStartTime(newStartTime);
  };

  const handleEndTimeChange = (newEndTime) => {
    setSelectedEndTime(newEndTime);
  };

  const formedTime = (time) => {
    return dayjs(time).utc().format("HH:mm");
  };

  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchAppointments = async () => {
      if (!selectedDate) return;
      setLoading(true);
      setError(null);

      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const response = await fetch(
          `http://3.123.49.33:8080/admin/getappointments?email=${user.email}&date=${formattedDate}`,
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

  const handleSubmit = async () => {
    if (!selectedDate || !selectedStartTime || !selectedEndTime) {
      setSnackbar({
        open: true,
        message: "Please select date, start time, and end time.",
        severity: "warning",
      });
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://3.123.49.33:8080/admin/addproviderapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            providerEmail: user.email,
            companyName: user.company_name,
            companyID: user.company_id,
            date: selectedDate.format("YYYY-MM-DD"),
            startTime: selectedStartTime.format("HH:mm"),
            endTime: selectedEndTime.format("HH:mm"),
            activate: false,
          }),
        }
      );
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Appointment added successfully!",
          severity: "success",
        });
        setIsCardOpen(false);
        nav(0);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to add appointment.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while adding the appointment.",
        severity: "error",
      });
    }
    refreshComponent();
  };
  const handleAuto = async () => {
    if (!shiftStart || !shiftEnd || !period || !weekdays) {
      setSnackbar({
        open: true,
        message:
          "Please select weekdays, start time, end time and period(with minutes).",
        severity: "warning",
      });
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://3.123.49.33:8080/admin/addappauto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ProviderEmail: user.email,
            ProviderName: user.name,
            CompanyName: user.company_name,
            CompanyID: user.company_id,
            Weekdays: weekdays,
            ShiftStart: shiftStart.format("HH:mm"),
            ShiftEnd: shiftEnd.format("HH:mm"),
            Period: parseInt(period),
            Activate: false,
          }),
        }
      );
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Appointment added successfully!",
          severity: "success",
        });
        setIsCardOpen(false);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to add appointment.",
          severity: "error",
        });
      }
      nav(0);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while adding the appointment.",
        severity: "error",
      });
    }
    refreshComponent();
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://3.123.49.33:8080/admin/deleteapp?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Appointment deleted successfully!",
          severity: "success",
        });
        setAppointments(appointments.filter((app) => app.id !== id));
      } else {
        setSnackbar({
          open: true,
          message: "Failed to delete appointment.",
          severity: "error",
        });
      }
      nav(0);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while deleting the appointment.",
        severity: "error",
      });
    }
    refreshComponent();
  };

  return (
    <Box>
      <NewDatePicker onDateChange={handleDateChange} />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button
        fullWidth
        onClick={handleAddButton}
        color="secondary"
        variant="contained"
      >
        {isCardOpen ? "Close" : "Add Appointment"}
      </Button>
      <br />
      <br />
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={handleAutoAddButton}
      >
        {autoAddButton ? "Close" : "Add Appointments Automaticly"}
      </Button>
      {isCardOpen && (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">Add Appointment</Typography>
            <Box>
              {isMobile ? (
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid className="clock" item xs={12}>
                    <Item>
                      <h4>Start Time:</h4>
                      <NewTimePicker onTimeChange={handleStartTimeChange} />
                    </Item>
                  </Grid>
                  <Grid className="clock" item xs={12}>
                    <Item>
                      <h4>End Time:</h4>
                      <NewTimePicker onTimeChange={handleEndTimeChange} />
                    </Item>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Item>
                      <h4>Start Time:</h4>
                      <NewTimePicker
                        onTimeChange={handleStartTimeChange}
                        label="Start Time"
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <h4>End Time:</h4>{" "}
                      <NewTimePicker
                        onTimeChange={handleEndTimeChange}
                        label="End Time"
                      />
                    </Item>
                  </Grid>
                </Grid>
              )}
            </Box>
            <br/>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
          </CardContent>
        </Card>
      )}
      {autoAddButton && (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">Select Weekdays</Typography>
            <SelectWeekdays handleWeekdays={handleDays} value={weekdays} />
            {isMobile ? (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid className="clock" item xs={12}>
                  <Item>
                    <Typography variant="h6">Shift Start Time</Typography>
                    <NewTimePicker onTimeChange={handleShiftStart} />
                  </Item>
                </Grid>
                <Grid className="clock" item xs={12}>
                  <Item>
                    <Typography variant="h6">Shift End Time</Typography>
                    <NewTimePicker onTimeChange={handleShiftEnd} />
                  </Item>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid className="clock" item xs={6}>
                  <Item>
                    <Typography variant="h6">Shift Start Time</Typography>
                    <NewTimePicker onTimeChange={handleShiftStart} />
                  </Item>
                </Grid>
                <Grid className="clock" item xs={6}>
                  <Item>
                    <Typography variant="h6">Shift End Time</Typography>
                    <NewTimePicker onTimeChange={handleShiftEnd} />
                  </Item>
                </Grid>
              </Grid>
            )}
            <br />
            <Typography variant="h6">Period:</Typography>
            <TextField
              fullWidth
              type="number"
              label="Period (minutes)"
              onChange={(e) => setPeriod(e.target.value)}
            />
            <br />
            <br />
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handleAuto}
            >
              OK
            </Button>
            <br />
          </CardContent>
        </Card>
      )}
      <Card sx={{ marginTop: 2 }}>
        {appointments === null ? (
          <CardContent>
            <Typography>
              No appointments available for the selected date.
            </Typography>
          </CardContent>
        ) : (
          <CardContent key={refreshKey}>
            <Typography variant="h6">Appointments:</Typography>
            <List>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemText
                      primary={`Appointment: ${formedTime(
                        appointment.start_time
                      )} - ${formedTime(appointment.end_time)}`}
                      secondary={`Status: ${
                        appointment.activate
                          ? `Active Customer: ${appointment.customer_name}`
                          : "Inactive"
                      }`}
                    />
                    <Button
                      id={appointment.id}
                      onClick={() => handleDelete(appointment.id)}
                      color="error"
                    >
                      Delete
                    </Button>
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