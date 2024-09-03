import * as React from 'react'
import Box  from '@mui/material/Box'
import AppointmentEdit from '../../components/AppointmentEdit'
import Footer from '../../components/Footer'

export default function AdminAppointmentEdit(){
    return(
        <Box>
            <Box className="listing">
                <AppointmentEdit/>
            </Box>
            <Footer/>
        </Box>
    )
} 