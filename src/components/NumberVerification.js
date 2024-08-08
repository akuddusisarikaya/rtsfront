import * as React from 'react'
import '../App.css'
import { Button, TextField } from '@mui/material'

function NumberVerification(params) {
    return(
        <div>
            <h1 style={{marginTop : "15%"}}>
                Verificate Your Number
            </h1>
            <br></br>
            <br></br>
            <TextField id="smscode" label="SMS Code" variant="outlined" style={{width :"30%"}} />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color='error' style={{width :"30%"}}> Send SMS Again</Button>
            <br></br>
            <br></br>
            <Button variant="contained" color='secondary' style={{width :"30%"}}> Verificate</Button>        
        </div>
    )
}
export default NumberVerification