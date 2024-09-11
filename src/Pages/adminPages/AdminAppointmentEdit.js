import * as React from 'react'
import Box  from '@mui/material/Box'
import AppointmentEdit from '../../components/AppointmentEdit'
import Footer from '../../components/Footer'
import AdminDrawer from '../../components/adminPages/AdminDrawer'

export default function AdminAppointmentEdit(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="listing">
                <AppointmentEdit/>
            </Box>
            <Footer/>
        </Box>
    )
} 