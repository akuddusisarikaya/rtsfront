import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ManagerAddServiceContent from "../../components/managerPages/ManagerAddServiceContent"
import ManagerDrawer from "../../components/managerPages/ManagerDrawer"
import Footer from "../../components/Footer"

export default function ManagerAddService(){
    return(
        <Box>
            <ManagerDrawer/>
            <Box className = "dashboardNotMobile">
                <ManagerAddServiceContent/>
            </Box>
            <Footer/>
        </Box>
    )
}