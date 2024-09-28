import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Clock from "./Clock";
import CardActionArea from "@mui/material/CardActionArea"
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function DateChoise() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const user = JSON.parse(sessionStorage.getItem("user"))

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const nav = useNavigate()

  const goAppointments = () => {

    if(user.role === "Provider"){
      nav('/appofday')
    } else if(user.role === "Manager"){
      nav("/managerappofday")
    } else if (user.role === "Admin"){
      nav("/appofdayadmin")
    }

  }

  return (
    <CardActionArea onClick={goAppointments}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Clock />
        <br/>
        <DemoContainer components={["DateCalendar"]}>
          <div style={{ marginLeft: "2%" }}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              views={["year", "month", "day"]}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </CardActionArea>
  );
}
