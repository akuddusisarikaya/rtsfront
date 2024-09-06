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
} from "@mui/material";
import NewTimePicker from "../NewTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMediaQuery } from "@mui/material";

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

export default function ProviderWorkingDatesContent() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isCardOpen, setIsCardOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [selectedStartTime, setSelectedStartTime] = React.useState(null);
  const [selectedEndTime, setSelectedEndTime] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const company = localStorage.getItem("company");
  const [editStartTime, setEditStartTime] = React.useState(null);
  const [editEndTime, setEditEndTime] = React.useState(null);
  const [editAppointmentId, setEditAppointmentId] = React.useState(null);

  const [refreshKey, setRefreshKey] = React.useState(0);

  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Key'i değiştirerek bileşeni yeniden oluşturur
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddButton = () => {
    setIsCardOpen(!isCardOpen);
  };

  const handleEditButton = (id) => {
    setEditAppointmentId(id);
    setIsEditOpen(!isEditOpen);
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
  const handleEditStartTime = (e) => {
    setEditStartTime(e);
  };
  const handleEditEndTime = (e) => {
    setEditEndTime(e);
  };

  const formedTime = (time) => {
    return dayjs.utc(time).format("HH:mm");
  };

  React.useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedDate) return;
      setLoading(true);
      setError(null);

      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const response = await fetch(
          `http://localhost:8080/provider/getappointments?email=${email}&date=${formattedDate}`,
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
  }, [selectedDate, email, token]);

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
      const response = await fetch(
        "http://localhost:8080/provider/addproviderapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            providerEmail: email,
            companyName: company,
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

  const handleEdit = async (id) => {
    if (!id) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/provider/updateapp?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            startTime: editStartTime.format("HH:mm"),
            endTime: editEndTime.format("HH:mm"),
          }),
        }
      );
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Appointment updated successfully!",
          severity: "success",
        });
        setIsEditOpen(false);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to update appointment.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while updating the appointment.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
    refreshComponent();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/provider/deleteapp?id=${id}`,
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
        setAppointments(appointments.filter((app) => app._id !== id));
      } else {
        setSnackbar({
          open: true,
          message: "Failed to delete appointment.",
          severity: "error",
        });
      }
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
      <Button onClick={handleAddButton} color="secondary" variant="contained">
        {isCardOpen ? "Close" : "Add Appointment"}
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
                    <Item >
                    <h4>Start Time:</h4>
                      <NewTimePicker
                        onTimeChange={handleStartTimeChange}
                        label="Start Time"
                      />
                    </Item>
                  </Grid>
                  <Grid className="clock" item xs={12}>
                    <Item >
                    <h4>End Time:</h4>
                      <NewTimePicker
                        onTimeChange={handleEndTimeChange}
                        label="End Time"
                      />
                    </Item>
                  </Grid>
                </Grid>
              ):(
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
                    <h4>End Time:</h4>
                      {" "}
                      <NewTimePicker
                        onTimeChange={handleEndTimeChange}
                        label="End Time"
                      />
                    </Item>
                  </Grid>
                </Grid>
              )}
            </Box>

            <Button
              onClick={handleSubmit}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
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
                    <Button
                      color="secondary"
                      onClick={() => handleEditButton(appointment._id)}
                    >
                      {isEditOpen && editAppointmentId === appointment._id
                        ? ""
                        : "Edit"}
                    </Button>
                    {isEditOpen && editAppointmentId === appointment._id && (
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        key={appointment._id}
                      >
                        <TimePicker
                          key={appointment._id}
                          ampm={false}
                          value={selectedStartTime}
                          onTimeChange={handleEditStartTime}
                          label="Edit Start Time"
                        />
                        <TimePicker
                          key={appointment._id}
                          ampm={false}
                          value={selectedEndTime}
                          onTimeChange={handleEditEndTime}
                          label="Edit End Time"
                        />
                      </LocalizationProvider>
                    )}
                    <Button
                      key={appointment._id}
                      onClick={() => handleEdit(appointment.ID)}
                      color="secondary"
                    >
                      Save
                    </Button>
                    <Button
                      key={appointment._id}
                      onClick={() => handleDelete(appointment.ID)}
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
