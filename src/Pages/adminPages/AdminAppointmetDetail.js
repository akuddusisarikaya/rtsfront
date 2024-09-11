import * as React from 'react'
import '../../App.css'
import Box from '@mui/material/Box'
import AppointmentDetail from '../../components/AppointmentDetail'
import AdminDrawer from '../../components/adminPages/AdminDrawer'

export default function AdminAppointmentDetail(){
    return(
        <Box>
            <AdminDrawer/>
            <Box>
                <AppointmentDetail/>
            </Box>
        </Box>
    )
}