import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import ProviderAppointmentContent from "../../components/providerPages/ProviderAppointmentContent"
import Footer from "../../components/Footer"

export default function ProviderAppointment(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderAppointmentContent/>
            </Box>
            <Footer/>
        </Box>
    )
}