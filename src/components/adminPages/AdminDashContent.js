import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SmallProviders from "../SmallProviders";
import DateChoise from "../DateChoise";
import SmallAppointments from "../SmallAppointments";
import { useMediaQuery, Button } from "@mui/material";
import SmallManagers from "../SmallManagers";
import SmallServices from "../SmallServices";
import { useNavigate } from "react-router-dom";



export default function AdminDashContent() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const nav = useNavigate()

  const goLinkCreat = () => {
    nav("/adminlinkcreate")
  }

  return (
    <Box sx={{ width: "100%" }}>
      <br/>
      <Button color="secondary" variant="contained" onClick={goLinkCreat} fullWidth> Create Link </Button>
      <br/>
      <br/>
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
        </Grid>
      )}
    </Box>
  );
}
