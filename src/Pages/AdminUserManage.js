import * as React from "react";
import "../App.css";
import AdminDrawer from "../components/AdminDrawer";
import Box from "@mui/material/Box";
import AdminUserContent from "../components/AdminUserContent";
import { Button } from "@mui/material";
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'

function AdminUserManage() {

  const navigate = useNavigate()

  const addNew = () => {
    navigate('/adminaddnewuser')
  }

  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminUserContent />
      </Box>
      <Button onClick={addNew} variant="contained" style={{marginLeft: "35%", marginTop: "10%", width: "30%"}}> Add New </Button>
      <Footer/>
    </Box>
  );
}

export default AdminUserManage;
