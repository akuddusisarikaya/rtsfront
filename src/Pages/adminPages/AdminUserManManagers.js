import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ManagersList from "../../components/ManagersList";
import Footer from '../../components/Footer'
import AdminDrawer from "../../components/adminPages/AdminDrawer";

export default function AdminUserManManagers() {
  return (
    <Box>
        <ManagersList />
      <Footer/>
    </Box>
  );
}
