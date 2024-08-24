import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";
import AdminDrawer from "../components/AdminDrawer";
import AdminServiceContent from "../components/AdminServiceContent";

export default function AdminServicesAndPrices(params) {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminServiceContent/>
      </Box>
      <Footer />
    </Box>
  );
}