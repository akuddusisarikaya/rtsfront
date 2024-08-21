import * as React from "react";
import "../App.css";
import AdminDrawer from "../components/AdminDrawer";
import Box from "@mui/material/Box";
import Footer from '../components/Footer'
import AppointmentsList from "../components/AppointmentsList";


export default function AdminManageAppointments(){
    return (
        <Box>
          <AdminDrawer />
          <Box className="dashboardNotMobile">
            <AppointmentsList />
          </Box>
          <Footer/>
        </Box>
      );
}