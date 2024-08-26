import * as React from 'react'
import '../../App.css'
import  Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DateChoise from '../DateChoise';
import SmallServices from '../SmallServices';
import { Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function AdminServiceContent(){
    const isMobile = useMediaQuery('(max-width:768px)');
    const nav = useNavigate()
    const addService = () => {
      nav('/adminaddservice')
    }
    return(<Box>
        {isMobile ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className="itemStyles"><DateChoise/></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallServices/></Paper>
          </Grid>
          <Button color="secondary" variant='contained' style={{margin: "10%", marginLeft: "30%"}}> Add Service</Button>
        </Grid>
        
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Paper className="itemStyles"><DateChoise /></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles"><SmallServices/></Paper>
          </Grid>
          <Button color="secondary" style={{margin : "10%", width: "30%"}} variant='contained' onClick={addService}>Add Service</Button>
        </Grid>
      )}
    </Box>)
}