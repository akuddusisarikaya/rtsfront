import * as React from "react";
import { Box, Card } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function NewTimePicker({ onTimeChange}, label) {
  const [selectedTime, setSelectedTime] = React.useState(dayjs());
  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onTimeChange(newValue);
  };



  return (
    <Card>
        <CardActionArea>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <StaticTimePicker
                label={label}
                value={selectedTime}
                onChange={handleTimeChange}
                ampm={false}
              />
            </Box>
          </LocalizationProvider>
        </CardActionArea>
    </Card>
  );
}
