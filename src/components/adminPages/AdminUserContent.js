import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SmallProviders from '../SmallProviders';
import SmallManagers from '../SmallManagers';
import { useMediaQuery } from '@mui/material';
import SmallCostumers from '../SmallCustomers';

export default function AdminUserContent() {

    const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallProviders /></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallManagers/></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles"><SmallCostumers/></Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Paper className="itemStyles"><SmallProviders /></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles"><SmallManagers/></Paper>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles"><SmallCostumers/></Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}