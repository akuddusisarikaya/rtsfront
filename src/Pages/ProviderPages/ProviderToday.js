import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import ProviderDrawer from "../../components/providerPages/ProviderDrawer"
import ProviderTodayContent from "../../components/providerPages/ProviderTodayContent"

export default function ProviderToday(){
    return(
        <Box>
            <ProviderDrawer/>
            <Box className="dashboardNotMobile">
                <ProviderTodayContent/>
            </Box>
        </Box>
    )
}