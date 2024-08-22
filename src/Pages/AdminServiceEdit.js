import * as React from 'react'
import '../App.css'
import  Box  from '@mui/material/Box'
import AdminDrawer from '../components/AdminDrawer'
import EditService from '../components/EditService'


export default function AdminServiceEdit(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <EditService/>
            </Box>
        </Box>
    )
}