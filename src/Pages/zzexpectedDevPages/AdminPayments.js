import * as React from 'react'
import Box  from '@mui/material/Box'
import AdminPaymentsContent from '../../components/zzexpectedDevComponenets/AdminPaymentsContent'
import Footer from '../../components/Footer'
import AdminDrawer from '../../components/adminPages/AdminDrawer'

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