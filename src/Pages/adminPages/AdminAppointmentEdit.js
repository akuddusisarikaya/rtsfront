import * as React from 'react'
import Box  from '@mui/material/Box'
import AppointmentEdit from '../../components/AppointmentEdit'

export default function AdminAppointmentEdit(){
    return(
        <Box>
            <Box className="dashboardNotMobile">
                <AppointmentEdit/>
            </Box>
        </Box>
    )
} 