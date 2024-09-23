import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import AddNewProvider from '../../components/AddNewProvider';
import AdminDrawer from "../../components/adminPages/AdminDrawer";

export default function AdminUserDetailEdit() {
  return (
    <Box>
        <AddNewProvider/>
      <Footer />
    </Box>
  );
}
