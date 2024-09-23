import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ManagerDrawer from "../../components/managerPages/ManagerDrawer"
import ManagerDashboardContent from "../../components/managerPages/ManagerDashboardContent"
import Footer from "../../components/Footer"

export default function ManagerDashboard(){
    return(
        <Box>
            <ManagerDrawer/>
            <Box className="dashboardNotMobile">
                <ManagerDashboardContent/>
            </Box>
            <Footer/>
        </Box>
    )
}