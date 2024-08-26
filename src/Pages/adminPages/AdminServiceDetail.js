import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import AdminDrawer from "../../components/adminPages/AdminDrawer";
import ServiceDetail from "../../components/ServiceDetail";

export default function AdminServiceDetail() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <ServiceDetail/>
      </Box>
    </Box>
  );
}
