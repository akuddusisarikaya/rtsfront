import * as React from 'react'
import '../../App.css'
import Box from '@mui/material/Box'
import AppointmentDetail from '../../components/AppointmentDetail'

export default function AdminAppointmentDetail(){
    return(
        <Box>
            <Box className="dashboardNotMobile">
                <AppointmentDetail/>
            </Box>
        </Box>
    )
}