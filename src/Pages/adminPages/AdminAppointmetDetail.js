import * as React from 'react'
import '../../App.css'
import Box from '@mui/material/Box'
import AdminDrawer from '../../components/adminPages/AdminDrawer'
import AppointmentDetail from '../../components/AppointmentDetail'

export default function AdminAppointmentDetail(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AppointmentDetail/>
            </Box>
        </Box>
    )
}