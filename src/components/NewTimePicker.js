import * as React from "react";
import { Box } from "@mui/material";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function NewTimePicker({ onTimeChange }, label) {
  const [selectedTime, setSelectedTime] = React.useState(dayjs());
  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onTimeChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <StaticTimePicker
          value={selectedTime}
          onChange={handleTimeChange}
          ampm={false}
        />
      </Box>
    </LocalizationProvider>
  );
}
