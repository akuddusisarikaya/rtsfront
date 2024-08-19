import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SmallProviders from './SmallProviders';
import SmallManagers from './SmallManagers';
import { Button, useMediaQuery } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function AdminUserContent() {

    const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item><SmallProviders /></Item>
          </Grid>
          <Grid item xs={12}>
            <Item><SmallManagers/></Item>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item><SmallProviders /></Item>
          </Grid>
          <Grid item xs={6}>
            <Item><SmallManagers/></Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}