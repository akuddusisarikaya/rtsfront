import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import AddNewProvider from '../../components/AddNewProvider';

export default function AdminUserDetailEdit() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <AddNewProvider/>
      </Box>
      <Footer />
    </Box>
  );
}
