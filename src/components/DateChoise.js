import * as React from "react";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Clock from "./Clock";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: "#ab47bc",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ce93d8", 
    },
  },
  "& .MuiPickersDay-root.Mui-selected:hover": {
    backgroundColor: "#ce93d8",
  },
  "& .MuiPickersDay-root.Mui-selected:focus": {
    backgroundColor: "#ab47bc",
  },
}));

export default function DateChoise() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Clock />
      <DemoContainer components={["DateCalendar"]}>
        <div style={{ marginLeft: "2%" }}>
          <StyledDateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            views={["year", "month", "day"]}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
