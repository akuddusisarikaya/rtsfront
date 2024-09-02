import * as React from 'react'
import "../../App.css";
import  Box  from '@mui/material/Box'
import EditService from '../../components/EditService'

export default function AdminServiceEdit(){
    return(
        <Box>
            <Box className="dashboardNotMobile">
                <EditService/>
            </Box>
        </Box>
    )
}