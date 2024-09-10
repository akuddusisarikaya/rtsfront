import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import ProviderAddServiceContent from "../../components/providerPages/ProviderAddServiceContent"
import Footer from "../../components/Footer"

export default function ProviderAddService(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile" >
                <ProviderAddServiceContent/>
            </Box>
            <Footer/>
        </Box>
    )
}