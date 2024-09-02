import * as React from "react"
import Box from "@mui/material/Box"
import "../../App.css"
import "../../components/providerPages/ProviderDrawer"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import ProviderDashboardContent from "../../components/providerPages/ProviderDashboardContent"
import Footer from "../../components/Footer"

export default function ProviderDashboard(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderDashboardContent />
            </Box>
            <Footer/>
        </Box>
    )
}
