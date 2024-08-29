import * as React from "react"
import "../App.css"
import Box  from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router-dom"
export default function UserProfileEdit(){

    const nav = useNavigate()

    const goBack = () => {
        nav(-1)
    }
    return(
        <Box>
            <h1 className="userProfileh1" >CARMESOFT S.A.M.</h1>
            <br></br>
            <Button style={{marginLeft: "20%"}} onClick={goBack} color="secondary">Back</Button>
            <br></br>
            <br></br>
            <Card className="userProfileCard">
            <br></br> <br></br>
                <TextField label="Name" defaultValue={"UserName"}  />
                <br></br> <br></br>
                <TextField label="Email" defaultValue={"user@email.co"} />
                <br></br> <br></br>
                <TextField label="Phone" defaultValue={"555 555 55 55"} />
                <br></br> <br></br>
                <Button variant="contained" color="secondary" style={{marginLeft:"25%"}} onClick={goBack}> Save</Button>
            </Card>
        </Box>
    )
}