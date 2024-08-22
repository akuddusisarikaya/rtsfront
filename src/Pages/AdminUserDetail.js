import * as React from "react";
import "../App.css";
import AdminDrawer from "../components/AdminDrawer";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";
import UserDetail from "../components/UserDetail";

export default function AdminUserDetail() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <UserDetail />
      </Box>
      <Footer />
    </Box>
  );
}
