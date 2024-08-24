import * as React from 'react'
import '../App.css'
import Box  from '@mui/material/Box'
import { Button, TextField, Card } from '@mui/material'
import AdminSettingTabs from './AdminSettingTabs'
export default function AdminSettingsContent(){
    return(
        <Box>
            <Card>
                <AdminSettingTabs />
            </Card>
        </Box>
    )
}