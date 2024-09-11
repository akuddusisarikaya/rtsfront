import * as React from 'react'
import '../../App.css'
import Box  from '@mui/material/Box'
import AddAppointment from '../../components/AddAppointment'
import AdminDrawer from '../../components/adminPages/AdminDrawer'

export default function AdminAddAppointment(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="listing">
                <AddAppointment/>
            </Box>
        </Box>
    )

}