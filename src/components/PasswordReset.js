import * as React from 'react'
import '../App.css'
import { Button, TextField } from '@mui/material'

function PasswordReset(params) {
    return(
        <div>
            <h1 style={{marginTop: "15%"}}>Reset Pasword</h1>
            <br></br>
            <br></br>
            <TextField id="resetpassword" label="Email or Phone Number" variant="outlined" style={{width :"30%"}}></TextField>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color='secondary' style={{width :"30%"}}> Reset Password</Button>
        </div>
    )
} 
export default PasswordReset