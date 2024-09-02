import * as React from 'react'
import "../../App.css";
import Box  from '@mui/material/Box'
import PaymentsList from '../../components/PaymentsList'

export default function AdminPaymentList(){
    return(
        <Box>
            <Box className="dashboardNotMobile">
                <PaymentsList/>
            </Box>
        </Box>
    )
}