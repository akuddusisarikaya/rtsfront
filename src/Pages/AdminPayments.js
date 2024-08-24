import * as React from 'react'
import Box  from '@mui/material/Box'
import AdminDrawer from '../components/AdminDrawer'
import AdminPaymentsContent from '../components/AdminPaymentsContent'
import Footer from '../components/Footer'

function AdminPayments() {
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AdminPaymentsContent/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default AdminPayments