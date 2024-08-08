import * as React from "react";
import Button from '@mui/material/Button';
import '../App.css'

function Homepage() {

    return(
        <div className="greets">
            <h1>Welcome to Appointment Manage System</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
            <p> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p> 
            <p>quis nostrud exercitation ullamco laboris nisi ut aliquip </p>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary" style={{width :"30%"}}>
                Login
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary"style={{width :"30%"}}>
                Register
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary" style={{width :"30%"}}>
                Make Appointment
            </Button>
        </div>
    )
    
}
export default Homepage