import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DateChoise from "../DateChoise";
import SmallAppointments from "../SmallAppointments";
import SmallServices from "../SmallServices";


export default function ProviderTodayContent(){
    return(
        <Box>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallAppointments />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <DateChoise />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallServices />
            </Paper>
          </Grid>
        </Grid>
        </Box>
    )
}