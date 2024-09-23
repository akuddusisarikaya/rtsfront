import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import Footer from "../../components/Footer"
import ServiceList from "../../components/ServiceList"

export default function ProviderServiceList(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box >
                <ServiceList/>
            </Box>
            <Footer/>
        </Box>
    )
}