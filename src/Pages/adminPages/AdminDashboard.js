import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/adminPages/AdminDrawer";
import Box from "@mui/material/Box";
import AdminDashContent from "../../components/adminPages/AdminDashContent";
import Footer from '../../components/Footer'
function AdminDashboard() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminDashContent />
      </Box>
      <Footer/>
    </Box>
  );
}

export default AdminDashboard;
