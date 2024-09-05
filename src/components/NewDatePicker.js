import * as React from "react";
import "../App.css"
import Box  from "@mui/material/Box";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function NewDatePicker({onDateChange}){
  const [selectDate, setSelectDate] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setSelectDate(newValue);
    onDateChange(newValue)
  };

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <StaticDatePicker
          label="Tarih Seçin"
          value={selectDate}
          onChange={handleDateChange}
        />
      </Box>
    </LocalizationProvider>
  )
}