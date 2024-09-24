import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import AdminDrawer from "../../components/adminPages/AdminDrawer"
import AdminUserContent from "../../components/adminPages/AdminUserContent";
import { Button } from "@mui/material";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function AdminUserManage() {
  const navigate = useNavigate();

  const addProvider = () => {
    navigate("/newprovider");
  };

  return (
    <Box>
      <AdminDrawer/>
      <Box className="dashboardNotMobile">
      <br />
      <br />
      <Button
        color="secondary"
        onClick={addProvider}
        variant="contained"
        fullWidth
      >
        Add / Edit User{" "}
      </Button>
      <br />
      <br />
        <AdminUserContent/>
      </Box>
      <Footer />
    </Box>
  );
}

export default AdminUserManage;
