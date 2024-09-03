import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DateChoise from "../DateChoise";
import SmallAppointments from "../SmallAppointments";
import SmallPayments from "../SmallPayments";

export default function AdminTodayContent() {
  return (
    <Box sx={{ width: "100%" }}>
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
            <SmallPayments />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
