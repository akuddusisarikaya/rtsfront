import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Footer from '../../components/Footer'
import AppointmentsList from "../../components/AppointmentsList";


export default function AdminManageAppointments(){
    return (
        <Box>
          <Box className="listing">
            <AppointmentsList />
          </Box>
          <Footer/>
        </Box>
      );
}