import * as React from 'react'
import '../../App.css'
import Box from '@mui/material/Box'
import ServiceAdd from '../../components/ServiceAdd'
import Footer from '../../components/Footer'

export default function AdminAddService(){
    return(
        <Box>
            <Box className="listing">
                <ServiceAdd/>
            </Box>
            <Footer/>
        </Box>
    )
}