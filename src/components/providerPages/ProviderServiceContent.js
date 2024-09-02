import * as React from "react";
import "../../App.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DateChoise from "../DateChoise";
import SmallServices from "../SmallServices";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ProviderServiceContent() {
    const nav = useNavigate();
    const addService = () => {
        nav("/adminaddservice")
    }
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box>
      {isMobile ? (
        <Grid container spacing={2}>
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
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <DateChoise />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="itemStyles">
              <SmallServices />
            </Paper>
          </Grid>
        </Grid>
      )}
      <Box>
        <br></br>
        <Button onClick={addService} variant="contained" color="secondary" > Add Service </Button>
      </Box>
    </Box>
  );
}
