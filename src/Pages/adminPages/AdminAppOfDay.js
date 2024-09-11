import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import AdminDrawer from "../../components/adminPages/AdminDrawer";
import AdminAppOfDayContent from "../../components/adminPages/AdminAppOfDayContent";

export default function AdminAppOfDay() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminAppOfDayContent />
      </Box>
    </Box>
  );
}
