import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import AddNewUser from '../../components/AddNewUser';

export default function AdminUserDetailEdit() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <AddNewUser/>
      </Box>
      <Footer />
    </Box>
  );
}
