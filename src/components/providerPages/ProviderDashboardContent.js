import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DateChoise from "../DateChoise";
import SmallAppointments from "../SmallAppointments";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import SmallServices from "../SmallServices";
import SmallServicesForProvider from "./SmallServicesForProvider";

export default function ProviderDashboardContent() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const nav = useNavigate();
  const editApps = () => {
    nav("/providerworkingdates");
  };
  return (
    <Box>
      <br />
      <br />
      <Button
        color="secondary"
        variant="contained"
        onClick={editApps}
        fullWidth
      >
        {" "}
        Edit Appointments
      </Button>
      <br />
      <br />
      {isMobile ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <DateChoise size="small" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallAppointments size="small" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="itemStyles">
              <SmallServicesForProvider />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
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
              <SmallServicesForProvider />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
