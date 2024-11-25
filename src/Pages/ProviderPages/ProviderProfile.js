import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import Footer from "../../components/Footer"
import ProviderProfileContent from "../../components/providerPages/ProviderProfileContent"

export default function ProviderProfile(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderProfileContent/>
            </Box>
            <Footer/>
        </Box>
    )
}