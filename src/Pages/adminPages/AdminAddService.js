import * as React from 'react'
import '../../App.css'
import Box from '@mui/material/Box'
import AdminDrawer from '../../components/adminPages/AdminDrawer'
import ServiceAdd from '../../components/ServiceAdd'
import Footer from '../../components/Footer'

export default function AdminAddService(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <ServiceAdd/>
            </Box>
            <Footer/>
        </Box>
    )
}