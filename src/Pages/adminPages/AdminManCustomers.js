import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import CustomerList from "../../components/CustomerList";
import Footer from '../../components/Footer'

export default function AdminManCustomers() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <CustomerList />
      </Box>
      <Footer/>
    </Box>
  );
}
