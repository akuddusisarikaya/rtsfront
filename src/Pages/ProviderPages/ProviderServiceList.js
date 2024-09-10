import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import ProviderServiceListContent from "../../components/providerPages/ProviderServiceListContent"
import Footer from "../../components/Footer"

export default function ProviderServiceList(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderServiceListContent/>
            </Box>
            <Footer/>
        </Box>
    )
}