import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, TextField, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export default function AddNewManager() {
  const [manager, setManager] = React.useState({
    name: "",
    role: "Manager",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    companyID:"",
  });

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Değerlerin değişimini yönetmek için
  const handleChange = (e) => {
    const { id, value } = e.target;
    setManager((prevManager) => ({
      ...prevManager,
      [id]: value,
    }));
  };

  // Manager ekleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const admin = JSON.parse(localStorage.getItem("admin"));

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/admin/manager/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: manager.name,
          email: manager.email,
          password: manager.password,
          role: manager.role,
          phone: manager.phone,
          companyName: admin.CompanyName,
          companyID : admin.CompanyID
        }),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Manager registered successfully!",
          severity: "success",
        });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to register manager.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error registering manager:", error);
      setSnackbar({
        open: true,
        message: "Error occurred during registration.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Button color="secondary" onClick={goBack}>
          Back
        </Button>
      <Card className="userDetailCard">
        <br />
        
        <CardContent>
          <TextField
            fullWidth
            label="Name"
            id="name"
            value={manager.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Role"
            id="role"
            value={manager.role}
            onChange={handleChange} // Manager rolünü seçili bırakmak için
            disabled // Rol değişimini devre dışı bırak
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="eMail"
            id="email"
            value={manager.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Phone Number"
            id="phone"
            value={manager.phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="password"
            label="Password"
            id="password"
            value={manager.password}
            onChange={handleChange}
          />
          <br />
          <br />
        </CardContent>
        <CardActions>
          <Button style={{marginLeft: "40%"}} variant="contained" color="secondary" onClick={handleSubmit}>
            Save
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
