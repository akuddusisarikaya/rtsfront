import * as React from 'react'
import "../App.css"
import Box  from "@mui/material/Box"
import EmailVerification from "../components/EmailVerification"

export default function EmailVer(){
    return(
        <Box className="verification">
            <EmailVerification/>
        </Box>
    )
}