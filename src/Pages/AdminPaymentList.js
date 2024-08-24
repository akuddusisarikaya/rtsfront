import * as React from 'react'
import '../App.css'
import Box  from '@mui/material/Box'
import AdminDrawer from '../components/AdminDrawer'
import PaymentsList from '../components/PaymentsList'

export default function AdminPaymentList(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <PaymentsList/>
            </Box>
        </Box>
    )
}