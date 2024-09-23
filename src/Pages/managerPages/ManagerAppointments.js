import * as React from "react"
import "../../App.css"
import ManagerDrawer from "../../components/managerPages/ManagerDrawer"
import ManagerAppointmentContent from "../../components/managerPages/ManagerAppointmentsContent"
import Box from "@mui/material/Box"
import Footer from "../../components/Footer"

export default function ManagerAppointments(){
    return(
        <Box>
            <ManagerDrawer/>
            <Box className="dashboardNotMobile">
                <ManagerAppointmentContent/>
            </Box>
            <Footer/>
        </Box>
    )
}