import * as React from 'react'
import "../../App.css";
import Box from '@mui/material/Box';
import AdminDrawer from '../../components/adminPages/AdminDrawer';
import AdminReportsContent from '../../components/adminPages/AdminReportsContent';

function AdminReports(){
    return(
        <Box>
            <AdminDrawer/>
            <Box className="dashboardNotMobile" >
                <AdminReportsContent/>
            </Box>
        </Box>
    )
}

export default AdminReports