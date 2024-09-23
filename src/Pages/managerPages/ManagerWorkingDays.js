import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ManagerDrawer from "../../components/managerPages/ManagerDrawer";
import ManagerWorkingDayContent from "../../components/managerPages/ManagerWorkingDayContent";
import Footer from "../../components/Footer";

export default function ManagerWorkingDays() {
  return (
    <Box>
      <ManagerDrawer />
      <Box className="dashboardNotMobile">
        <ManagerWorkingDayContent />
      </Box>
      <Footer/>
    </Box>
  );
}
