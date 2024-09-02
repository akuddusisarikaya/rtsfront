import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ServiceDetail from "../../components/ServiceDetail";

export default function AdminServiceDetail() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <ServiceDetail/>
      </Box>
    </Box>
  );
}
