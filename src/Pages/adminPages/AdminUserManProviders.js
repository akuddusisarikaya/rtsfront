import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ProviderList from "../../components/ProvidersList";
import Footer from '../../components/Footer'

export default function AdminUserManProviders() {
  return (
    <Box>
      <Box className="dashboardNotMobile">
        <ProviderList />
      </Box>
      <Footer/>
    </Box>
  );
}
