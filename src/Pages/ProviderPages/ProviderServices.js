import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import ProviderServiceContent from "../../components/providerPages/ProviderServiceContent"
import Footer from "../../components/Footer"

export default function ProviderServices(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderServiceContent/>
            </Box>
            <Footer/>
        </Box>
    )
}