import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";
import AdminDrawer from "../components/AdminDrawer";
import ServiceList from "../components/ServiceList";

function AdminServicesAndPrices(params) {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <ServiceList/>
      </Box>
      <Footer />
    </Box>
  );
}

export default AdminServicesAndPrices;
