import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import AdminDrawer from "../components/AdminDrawer";
import AdminSettingsContent from "../components/AdminSettingsContent";
export default function AdminSettings() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminSettingsContent selectedTab="User Settings" />
      </Box>
    </Box>
  );
}
