import * as React from "react"
import "../../App.css"
import ManagerDrawer from "../../components/managerPages/ManagerDrawer"
import Box  from "@mui/material/Box"
import ManagerServiceContent from "../../components/managerPages/ManagerServiceContent"
import Footer from "../../components/Footer"
export default function ManagerServices(){
    return(
        <Box>
            <ManagerDrawer/>
            <Box className="dashboardNotMobile">
                <ManagerServiceContent/>
            </Box>
            <Footer/>
        </Box>
    )
}