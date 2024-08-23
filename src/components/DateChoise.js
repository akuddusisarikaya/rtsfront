import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Clock from "./Clock";
import { TextField } from "@mui/material";
import dayjs from 'dayjs';

export default function DateChoise() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs()); // dayjs() ile mevcut tarihi alıyoruz

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Clock />
      <DemoContainer components={["DateCalendar"]}>
        <DateCalendar
          value={selectedDate} // value prop'u ile seçilen tarihi belirtiyoruz
          onChange={handleDateChange}
          views={["year", "month", "day"]}
          renderInput={(params) => <TextField {...params} />}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
