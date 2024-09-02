import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import Footer from "../../components/Footer"

export default function ProviderProfile(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">

            </Box>
            <Footer/>
        </Box>
    )
}