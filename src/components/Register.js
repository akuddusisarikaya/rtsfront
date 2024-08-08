import * as React from 'react'
import '../App.css'
import { Box, TextField, Button } from '@mui/material'

function Register() {
    return(
        <div>
            <h1 style={{marginTop : "5%"}}>Register</h1>
            <br></br>
            <br></br>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                style={{width :"30%"}}
                id="name-required"
                label="Name"
                />
                <br></br>
                <br></br>
                <TextField
                style={{width :"30%"}}
                required
                id="surname-required"
                label="Surname"
                />
                <br></br>
                <br></br>
                <TextField
                style={{width :"30%"}}
                required
                id="email-required-input"
                label="e-Mail"
                type="email"
                />
                <br></br>
                <br></br>
                <TextField
                required
                style={{width :"30%"}}
                id="outlined-number"
                label="Number"
                />
                <br></br>
                <br></br>
                <TextField
                style={{width :"30%"}}
                required
                id="password-required"
                label="Password"
                type='password'
                />
                <br></br>
                <br></br>
                <TextField
                style={{width :"30%"}}
                required
                id="password-again-required"
                label="Password Again"
                type='password'
                />
                <br></br>
                <br></br>
            </div>
            <br></br>
            <Button variant="contained" color='secondary' style={{width :"30%"}}>Register</Button>
        </Box>
        </div>
    )
}
export default Register