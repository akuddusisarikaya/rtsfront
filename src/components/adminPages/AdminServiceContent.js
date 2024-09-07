import * as React from 'react'
import '../../App.css'
import  Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DateChoise from '../DateChoise';
import SmallServices from '../SmallServices';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function AdminServiceContent(){
    const nav = useNavigate()
    const addService = () => {
      nav('/adminaddservice')
    }
    return(<Box>
        <Grid container spacing={2}>
          <Button color="secondary" variant='contained' onClick={addService} style={{marginTop: "5%", marginLeft: "30%", width:"50%"}}> Add Service</Button>
          <Grid item xs={12}>
            <Paper className="itemStyles"><DateChoise  size="large" /></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallServices size="large"/></Paper>
          </Grid>
          
        </Grid>
    </Box>)
}