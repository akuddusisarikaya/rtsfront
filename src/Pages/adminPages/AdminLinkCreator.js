import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import AdminLinkCreatorContent from "../../components/adminPages/AdminLinkCreatorContent"
import AdminDrawer from "../../components/adminPages/AdminDrawer"
import Footer from "../../components/Footer"

export default function AdminLinkCreator(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AdminLinkCreatorContent/>
            </Box>
            <Footer/>
        </Box>
    )
}