import * as React from 'react'
import Box  from '@mui/material/Box'
import AdminDrawer from '../components/AdminDrawer'
import AdminPaymentsContent from '../components/AdminPaymentsContent'

function AdminPayments() {
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile">
                <AdminPaymentsContent/>
            </Box>
        </Box>
    )
}

export default AdminPayments