import * as React from 'react'
import "../../App.css";
import Box from '@mui/material/Box'
import AdminDrawer from '../../components/adminPages/AdminDrawer'
import ServiceList from '../../components/ServiceList'

export default function AdminServiceList(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <ServiceList/>
            </Box>
        </Box>
    )
}