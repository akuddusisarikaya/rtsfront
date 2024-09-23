import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ProviderList from "../../components/ProvidersList";
import Footer from '../../components/Footer'
import AdminDrawer from "../../components/adminPages/AdminDrawer";

export default function AdminUserManProviders() {
  return (
    <Box>
        <ProviderList />
      <Footer/>
    </Box>
  );
}
