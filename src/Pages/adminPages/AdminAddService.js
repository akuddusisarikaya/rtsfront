import * as React from 'react'
import '../../App.css'
import Box from '@mui/material/Box'
import ServiceAdd from '../../components/ServiceAdd'
import Footer from '../../components/Footer'
import AdminDrawer from '../../components/adminPages/AdminDrawer'

export default function AdminAddService(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="listing">
                <ServiceAdd/>
            </Box>
            <Footer/>
        </Box>
    )
}