import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SmallProviders from "../SmallProviders";
import DateChoise from "../DateChoise";
import SmallCostumers from "../SmallCustomers";
import SmallAppointments from "../SmallAppointments";
import { useMediaQuery } from "@mui/material";
import SmallManagers from "../SmallManagers";
import SmallServices from "../SmallServices";
import SmallPayments from "../SmallPayments";


export default function AdminDashContent() {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <DateChoise />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallAppointments />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallProviders />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallManagers />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallServices />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallPayments />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallCostumers />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <DateChoise />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallAppointments />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallProviders />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallManagers />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallServices />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallPayments />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallCostumers />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
