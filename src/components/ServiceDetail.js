import * as React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Card, Button , TextField} from '@mui/material';
import Box from '@mui/material/Box';

export default function ServiceDetail(){

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    const editService = () => {
        navigate('/adminserviceedit')
    }
    return(
        <Box className="serviceDetailBox">
            <br></br>
            <br></br>
            <Card className='serviceDetailCard'>
                <br></br>
                <Button color="secondary" onClick={goBack}> BACK</Button>
                <br></br>
                <h1>Service#1</h1>
                <br></br>
                <h3>Service Name: </h3>
                <TextField disabled label=" Service #1"></TextField>
                <br></br>
                <h3> For: </h3>
                <TextField disabled select className='editSelectField' label="Manager"></TextField>
                <br></br>
                <h3> Price: </h3>
                <TextField disabled label="$100"></TextField>
                <br></br>
                <br></br>
                <Button color="secondary" variant='contained' onClick={editService} className='serviceEditSaveButton' > Edit </Button>
            </Card>
        </Box>
    )
}