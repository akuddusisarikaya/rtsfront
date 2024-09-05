import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import EditUser from '../../components/EditUser'

export default function AdminUserDetailEdit() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <EditUser/>
      </Box>
      <Footer />
    </Box>
  );
}