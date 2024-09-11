import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, TextField, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export default function AddNewProvider() {
  const [provider, setProvider] = React.useState({
    name: "",
    role: "Provider",
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
    setProvider((prevProvider) => ({
      ...prevProvider,
      [id]: value,
    }));
  };

  // Provider ekleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:8080/admin/provider/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: provider.name,
          email: provider.email,
          password: provider.password,
          role: provider.role,
          phone: provider.phone,
          companyName: admin.CompanyName,
          companyID : admin.CompanyID
        }),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Provider registered successfully!",
          severity: "success",
        });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to register provider.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error registering provider:", error);
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
            value={provider.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Role"
            id="role"
            value={provider.role}
            onChange={handleChange} // Provider rolünü seçili bırakmak için
            disabled // Rol değişimini devre dışı bırak
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="eMail"
            id="email"
            value={provider.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Phone Number"
            id="phone"
            value={provider.phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="password"
            label="Password"
            id="password"
            value={provider.password}
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
