import * as React from "react";
import "../App.css";
import AdminDrawer from "../components/AdminDrawer";
import Box from "@mui/material/Box";
import AdminUserContent from "../components/AdminUserContent";
import { Button } from "@mui/material";
import Footer from '../components/Footer'

function AdminUserManage() {
  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminUserContent />
      </Box>
      <Button variant="contained" style={{marginLeft: "35%", marginTop: "10%", width: "30%"}}> Add New </Button>
      <Footer/>
    </Box>
  );
}

export default AdminUserManage;
