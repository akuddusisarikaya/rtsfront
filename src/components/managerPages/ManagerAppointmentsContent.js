import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DateChoise from "../DateChoise";
import SmallAppointments from "../SmallAppointments";
import { useNavigate } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import DownloadICSByCompany from "../DownloadICSByCompany";
import DownloadICSByEmail from "../DownlodaICSByEmail";
//import SendICSByCompany from "../SendICSByCompany";
//import SendICSByEmail from "../SendICSByEmail";

export default function ManagerAppointmentContent(){
    const nav = useNavigate();

  const addAppointment = () => {
    nav("/adminaddappointment");
  };

  const editApps = () => {
    nav("/managerworkdays")
  }

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box sx={{ width: "100%" }}>
      <br/>
      {isMobile&&<br/>}<Button
        color="secondary"
        fullWidth
        variant="contained"
        onClick={editApps}
      >
        Edit Appointment
      </Button>
      <br/>
      <br/>
       <Button
        color="secondary"
        fullWidth
        variant="contained"
        onClick={addAppointment}
      >
        Add Appointment
      </Button>
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
      <br/>
      <br/>
      <DownloadICSByCompany/>
      <br/>
      <DownloadICSByEmail/>
      <br/>
      <br/>
      {/*<SendICSByCompany/>*/}
      <br/>
      <br/>
      {/*<SendICSByEmail/>*/}
    </Box>
  );
}