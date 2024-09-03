import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import AdminTodayContent from "../../components/adminPages/AdminTodayContent"
import AdminDrawer from "../../components/adminPages/AdminDrawer"
import Footer from "../../components/Footer"

export default function AdminToday(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile" >
                <AdminTodayContent/>
            </Box>
            <Footer/>
        </Box>
    )
}