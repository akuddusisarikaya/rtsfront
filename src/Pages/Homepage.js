import * as React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Homepage() {

    const navigate = useNavigate();
    const loginButtonClick = () => {
        navigate('/login')
    }
    const registeButtonClick = () => {
        navigate('/register')
    }
    const appointmentButtonClick = () => {
        navigate('/appointment')
    }

    return(
        <div className="greets">
            <h1>Welcome to Appointment Manage System</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
            <p> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p> 
            <p>quis nostrud exercitation ullamco laboris nisi ut aliquip </p>
            <br></br>
            <br></br>
            <br></br>
            <div className="homepageButtons">
            <Button onClick={loginButtonClick} variant="contained" color="secondary"  className="buttonHP">
                Login
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button onClick={registeButtonClick} variant="contained" color="secondary" className="buttonHP">
                Register
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button onClick={appointmentButtonClick} variant="contained" color="secondary" className="buttonHP">
                Make Appointment
            </Button>
            </div>
        </div>
    )
    
}
export default Homepage