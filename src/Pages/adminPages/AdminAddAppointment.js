import * as React from 'react'
import '../../App.css'
import Box  from '@mui/material/Box'
import AddAppointment from '../../components/AddAppointment'

export default function AdminAddAppointment(){
    return(
        <Box>
            <Box className="listing">
                <AddAppointment/>
            </Box>
        </Box>
    )

}