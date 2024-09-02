import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import AdminServiceContent from "../../components/adminPages/AdminServiceContent";
import AdminDrawer from "../../components/adminPages/AdminDrawer";

export default function AdminServicesAndPrices(params) {
  return (
    <Box>
      <AdminDrawer/>
      <Box className="dashboardNotMobile">
        <AdminServiceContent/>
      </Box>
      <Footer />
    </Box>
  );
}