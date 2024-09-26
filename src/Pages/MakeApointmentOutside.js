import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Appointment from "./Appointment";
import Footer from "../components/Footer";

export default function MakeApointmentOutside() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <Appointment />
      </Box>
      <Footer />
    </Box>
  );
}
