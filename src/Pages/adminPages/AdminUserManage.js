import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import AdminUserContent from "../../components/adminPages/AdminUserContent";
import { Button } from "@mui/material";
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom'
import AdminDrawer from "../../components/adminPages/AdminDrawer";

function AdminUserManage() {

  const navigate = useNavigate()

  const addProvider = () => {
    navigate('/adminaddnewprovider')
  }
  const addManager = () => {
    navigate('/adminaddnewmanager')
  }

  return (
    <Box>
      <AdminDrawer/>
      <Box className="dashboardNotMobile">
        <AdminUserContent />
      </Box>
      <Button color="secondary" onClick={addProvider} variant="contained" style={{marginLeft: "35%", marginTop: "10%", width: "30%"}}> Add New Provider </Button>
      <Button color="secondary" onClick={addManager} variant="contained" style={{marginLeft: "35%", marginTop: "2%", width: "30%"}}> Add Manager</Button>
      <Footer/>
    </Box>
  );
}

export default AdminUserManage;
