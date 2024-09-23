import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ManagerDrawer from "../../components/managerPages/ManagerDrawer"
import ManagerProfileContent from "../../components/managerPages/ManagerProfileContent"
import Footer from "../../components/Footer"

export default function ManagerProfile(){
    return(
        <Box>
            <ManagerDrawer />
            <Box className="dashboardNotMobile">
                <ManagerProfileContent />
            </Box>
            <Footer/>
        </Box>
    )
}