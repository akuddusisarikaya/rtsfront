import * as React from "react";
import "../App.css";
import AdminDrawer from "../components/AdminDrawer";
import Box from "@mui/material/Box";
import ProviderList from "../components/ProvidersList";
import Footer from '../components/Footer'

export default function AdminUserManProviders() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <ProviderList />
      </Box>
      <Footer/>
    </Box>
  );
}
