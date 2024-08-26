import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/adminPages/AdminDrawer";
import Box from "@mui/material/Box";
import CustomerList from "../../components/CustomerList";
import Footer from '../../components/Footer'

export default function AdminManCustomers() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <CustomerList />
      </Box>
      <Footer/>
    </Box>
  );
}
