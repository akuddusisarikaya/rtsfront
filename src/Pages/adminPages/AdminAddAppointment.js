import * as React from 'react'
import '../../App.css'
import Box  from '@mui/material/Box'
import AdminDrawer from '../../components/adminPages/AdminDrawer'
import AddAppointment from '../../components/AddAppointment'

export default function AdminAddAppointment(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AddAppointment/>
            </Box>
        </Box>
    )

}