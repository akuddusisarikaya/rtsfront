import * as React from 'react'
import Box  from '@mui/material/Box'
import AdminDrawer from '../../components/adminPages/AdminDrawer'
import AdminApointmentsContent from'../../components/adminPages/AdminApointmentsContent'
import Footer from '../../components/Footer'
function AdminAppointments(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AdminApointmentsContent/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default AdminAppointments