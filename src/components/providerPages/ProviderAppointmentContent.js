import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DateChoise from "../DateChoise";
import SmallAppointments from "../SmallAppointments";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ProviderAppointmentContent() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const nav = useNavigate();
  const editApps = () => {
    nav("/providerworkingdates");
  };

  return (
    <Box>
      <Button
        color="secondary"
        variant="contained"
        onClick={editApps}
        style={{ marginLeft: "10%" }}
      >
        {" "}
        Edit Appointments
      </Button>
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
        </Grid>
      )}
    </Box>
  );
}
