import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import AdminDrawer from "../../components/adminPages/AdminDrawer"
import AdminWorkingDayContent from "../../components/adminPages/AdminWorkingDaysContent"

export default function AdminWorkingDay(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AdminWorkingDayContent/>
            </Box>
        </Box>
    )
}