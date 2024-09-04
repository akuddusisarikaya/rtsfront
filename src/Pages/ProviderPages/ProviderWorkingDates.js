import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderWorkingDatesContent from "../../components/providerPages/ProviderWorkingDatesContent"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import Footer from "../../components/Footer"

export default function ProviderWorkingDates(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderWorkingDatesContent/>
            </Box>
            <Footer/>
        </Box>
    )
}