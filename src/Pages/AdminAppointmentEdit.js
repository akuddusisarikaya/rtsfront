import * as React from 'react'
import Box  from '@mui/material/Box'
import AdminDrawer from '../components/AdminDrawer'
import AppointmentEdit from '../components/AppointmentEdit'

export default function AdminAppointmentEdit(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AppointmentEdit/>
            </Box>
        </Box>
    )
} 