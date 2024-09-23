import * as React from "react"
import "../../App.css"
import ManagerDrawer from "../../components/managerPages/ManagerDrawer"
import ManagerAppOfDayContent from "../../components/managerPages/ManagerAppOfDayContent"
import Box from "@mui/material/Box"
import Footer from "../../components/Footer"

export default function ManagerAppOfDay(){
    return(
        <Box>
            <ManagerDrawer/>
            <Box className="dashboardNotMobile">
                <ManagerAppOfDayContent/>
            </Box>
            <Footer/>
        </Box>
    )
}