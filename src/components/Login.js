import * as React from 'react'
import { TextField, Button } from '@mui/material'
import '../App.css'

function Login() {
    return(
        <div>
            <h1 style={{marginTop : "15%"}}> Login </h1>
            <br></br>
            <br></br>
            <br></br>
            <TextField id="email-phone" label="Email or Phone Number" variant="outlined" style={{width :"30%"}} />
            <br></br>
            <br></br>
            <br></br>
            <TextField id="password" label="Password" type='password' variant="outlined"  style={{width :"30%"}}/>
            <br></br>
            <br></br>
            <a>Forget Pasword?</a>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color='secondary' style={{width :"30%"}}> Login</Button>
        </div>
    )
}
export default Login