import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function DateChoise() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h3>Calendar</h3>
      <DemoContainer components={["DateCalendar"]}>
        <DateCalendar
          referenceDate={dayjs("2022-04-17")}
          views={["year", "month", "day"]}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}