import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ManagerDrawer from "../../components/managerPages/ManagerDrawer";
import ManagerUserContent from "../../components/managerPages/ManagerUserContent";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function ManagerUser() {
  const nav = useNavigate();

  const addProvider = () => {
    nav("/newprovider");
  };
  return (
    <Box>
      <ManagerDrawer />
      <Box className="dashboardNotMobile">
        <br/>
        <br/>
        <Button
          color="secondary"
          onClick={addProvider}
          variant="contained"
          fullWidth
        >
          Add / Edit User
        </Button>
        <br />
        <br />
        <ManagerUserContent />
        <Footer />
      </Box>
    </Box>
  );
}
