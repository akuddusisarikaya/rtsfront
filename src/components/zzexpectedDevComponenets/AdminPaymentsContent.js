import * as React from 'react'
import '../../App.css'
import  Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DateChoise from '../DateChoise';
import SmallAppointments from '../SmallAppointments';

import { useMediaQuery } from '@mui/material';
import SmallPayments from './SmallPayments';


export default function AdminPaymentsContent(){
    const isMobile = useMediaQuery('(max-width:768px)');

    return(
        <Box sx={{ width: '100%' }}>
      {isMobile ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className="itemStyles"><DateChoise/></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallPayments/></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallAppointments/></Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Paper className="itemStyles"><DateChoise /></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles"><SmallPayments/></Paper>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles"><SmallAppointments/></Paper>
          </Grid>
        </Grid>
      )}
    </Box>
    )
}