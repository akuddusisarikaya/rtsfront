import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/adminPages/AdminDrawer";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import EditUser from '../../components/EditUser'

export default function AdminUserDetailEdit() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <EditUser/>
      </Box>
      <Footer />
    </Box>
  );
}
