import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
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
      <Button
        color="secondary"
        onClick={addProvider}
        variant="contained"
        style={{ marginLeft: "25%", marginTop: "10%", width: "50%" }}
      >
        {" "}
        Add / Edit User{" "}
      </Button>
      <br />
      <br />
      <AdminUserContent />
      <Footer />
    </Box>
  );
}

export default AdminUserManage;
