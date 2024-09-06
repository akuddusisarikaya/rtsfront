import * as React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Footer from "../components/Footer";

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
    const goAdmin = () => {
        navigate('/adminlogin')
    }
    const goPrices = () => {
        navigate('/prices')
    }
    const goProvider = () => {
        navigate("/providerlogin")
    }
    const goManager = () => {
        navigate("/managerlogin")
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
            <Button color="secondary" onClick={loginButtonClick} variant="contained"  className="buttonHP">
                Login
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button color="secondary" onClick={registeButtonClick} variant="contained" className="buttonHP">
                Register
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button color="secondary" onClick={appointmentButtonClick} variant="contained" className="buttonHP">
                Make Appointment
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary" className="buttonHP" onClick={goPrices}> Prices</Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary" className="buttonHP" onClick={goAdmin}> Admin</Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary" className="buttonHP" onClick={goProvider}> Provider</Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" color="secondary" className="buttonHP" onClick={goManager}> Manager</Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            </div>
            <Footer/>
        </div>
    )
    
}
export default Homepage