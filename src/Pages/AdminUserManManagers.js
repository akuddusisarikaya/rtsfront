import * as React from "react";
import "../App.css";
import AdminDrawer from "../components/AdminDrawer";
import Box from "@mui/material/Box";
import ManagersList from "../components/ManagersList";
import Footer from '../components/Footer'

export default function AdminUserManManagers() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <ManagersList />
      </Box>
      <Footer/>
    </Box>
  );
}
