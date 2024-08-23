import * as React from 'react'
import Box  from '@mui/material/Box'
import AdminDrawer from '../components/AdminDrawer'
import AdminApointmentsContent from'../components/AdminApointmentsContent'
function AdminAppointments(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AdminApointmentsContent/>
            </Box>
        </Box>
    )
}

export default AdminAppointments