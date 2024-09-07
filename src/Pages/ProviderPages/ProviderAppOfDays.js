import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderAppointmentsOfDay from "../../components/providerPages/ProviderAppointmentsOfDay"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import Footer from "../../components/Footer"

export default function ProviderAppOfDays() {
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderAppointmentsOfDay/>
            </Box>
            <Footer/>
        </Box>
    )
}