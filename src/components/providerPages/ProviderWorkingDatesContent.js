import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Badge,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function ProviderWorkingDatesContent(){
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});

  const handleDaySelect = (day) => {
    const dateString = day.format("YYYY-MM-DD");
    if (selectedDays.includes(dateString)) {
      // Kartı kapat
      setSelectedDays((prev) => prev.filter((d) => d !== dateString));
      setSelectedDate(null);
    } else {
      // Kartı aç
      setSelectedDays((prev) => [...prev, dateString]);
      setSelectedDate(day);
    }
  };

  const handleAppointmentChange = (index, field, value) => {
    setAppointments((prev) => {
      const dateString = selectedDate.format("YYYY-MM-DD");
      const updatedAppointments = [...(prev[dateString] || [])];
      updatedAppointments[index] = {
        ...updatedAppointments[index],
        [field]: value,
      };
      return { ...prev, [dateString]: updatedAppointments };
    });
  };

  const handleAddAppointment = () => {
    setAppointments((prev) => {
      const dateString = selectedDate.format("YYYY-MM-DD");
      const newAppointment = {
        startTime: "",
        endTime: "",
        status: "Pasif",
      };
      return {
        ...prev,
        [dateString]: [...(prev[dateString] || []), newAppointment],
      };
    });
  };

  const handleDeleteAppointment = (index) => {
    setAppointments((prev) => {
      const dateString = selectedDate.format("YYYY-MM-DD");
      const updatedAppointments = [...(prev[dateString] || [])];
      updatedAppointments.splice(index, 1);
      return { ...prev, [dateString]: updatedAppointments };
    });
  };

  const handleSaveAppointments = () => {
    setSelectedDate(null);
    console.log("Appointments saved:", appointments);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Aylık Çalışma Takvimi
        </Typography>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={null}
          onChange={() => {}}
          renderDay={(day, _value, DayComponentProps) => {
            const dateString = day.format("YYYY-MM-DD");
            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={
                  selectedDays.includes(dateString) ? "✓" : undefined
                }
              >
                <PickersDay
                  {...DayComponentProps}
                  day={day}
                  selected={selectedDays.includes(dateString)}
                  onClick={() => handleDaySelect(day)}
                />
              </Badge>
            );
          }}
        />
        {selectedDate && (
          <Card sx={{ marginTop: 3 }}>
            <CardContent>
              <Typography variant="h6">
                {selectedDate.format("YYYY-MM-DD")} için Randevular
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {(appointments[selectedDate.format("YYYY-MM-DD")] || []).map(
                  (appointment, index) => (
                    <Grid item xs={12} key={index}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                          label="Başlangıç Saati"
                          type="time"
                          value={appointment.startTime}
                          onChange={(e) =>
                            handleAppointmentChange(
                              index,
                              "startTime",
                              e.target.value
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{ width: 150 }}
                        />
                        <TextField
                          label="Bitiş Saati"
                          type="time"
                          value={appointment.endTime}
                          onChange={(e) =>
                            handleAppointmentChange(
                              index,
                              "endTime",
                              e.target.value
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{ width: 150 }}
                        />
                        <Typography variant="body2">
                          Durum: {appointment.status}
                        </Typography>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteAppointment(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddAppointment}
                variant="outlined"
                sx={{ marginTop: 2 }}
              >
                Yeni Randevu Ekle
              </Button>
              <Button
                onClick={handleSaveAppointments}
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Kaydet
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </LocalizationProvider>
  );
}