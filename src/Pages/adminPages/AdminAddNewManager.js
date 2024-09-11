import * as React from "react"
import "../../App.css"
import Box from "@mui/material/Box"
import AddNewManager from "../../components/AddNewManager"
import AdminDrawer from "../../components/adminPages/AdminDrawer"
export default function AdminAddNewManager(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AddNewManager/>
            </Box>

        </Box>
    )
}