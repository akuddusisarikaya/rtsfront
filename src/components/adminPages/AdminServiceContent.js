import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DateChoise from "../DateChoise";
import SmallServices from "../SmallServices";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export default function AdminServiceContent() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const nav = useNavigate();
  const addService = () => {
    nav("/addservice");
  };
  return (
    <Box>
      <Button
        color="secondary"
        variant="contained"
        onClick={addService}
        fullWidth
      >
        Add Service
      </Button>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={isMobile ? 12 : 6}>
          <Paper className="itemStyles">
            <DateChoise size="large" />
          </Paper>
        </Grid>
        <Grid item xs={isMobile ? 12 : 6}>
          <Paper className="itemStyles">
            <SmallServices size="large" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
