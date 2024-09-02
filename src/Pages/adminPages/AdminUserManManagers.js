import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ManagersList from "../../components/ManagersList";
import Footer from '../../components/Footer'

export default function AdminUserManManagers() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <ManagersList />
      </Box>
      <Footer/>
    </Box>
  );
}
