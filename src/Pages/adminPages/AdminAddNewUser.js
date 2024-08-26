import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/adminPages/AdminDrawer";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import AddNewUser from '../../components/AddNewUser';

export default function AdminUserDetailEdit() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AddNewUser/>
      </Box>
      <Footer />
    </Box>
  );
}
