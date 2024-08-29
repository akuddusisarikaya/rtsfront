import * as React from 'react'
import "../App.css"
import NumberVerification from "../components/NumberVerification"
import Box  from "@mui/material/Box"

export default function NumberVer(){
    return(
        <Box className="verification">
            <NumberVerification/>
        </Box>
    )
}