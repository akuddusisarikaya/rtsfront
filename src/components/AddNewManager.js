import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Button,
  CardActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export default function AddNewManager() {
  const [provider, setProvider] = React.useState({
    name: "",
    role: "Manager",
    email: "",
    phone: "",
    password: "",
    companyName : "",
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
      const token = localStorage.getItem('token'); 
      const response = await fetch("http://localhost:8080/admin/manager/add", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: provider.name,
          email: provider.email,
          passwordHash: provider.password,
          role: provider.role,
          phone: provider.phone,
          companyName: provider.companyName,
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
      <Card className="userDetailCard">
        <br />
        <Button color="secondary" onClick={goBack}>
          Back
        </Button>
        <Avatar className="userDetailAvatar"></Avatar>
        <CardContent>
          <TextField
            label="Name"
            id="name"
            value={provider.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Role"
            id="role"
            value={provider.role}
            onChange={handleChange} // Provider rolünü seçili bırakmak için
            disabled // Rol değişimini devre dışı bırak
          />
          <br />
          <br />
          <TextField
            label="eMail"
            id="email"
            value={provider.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Phone Number"
            id="phone"
            value={provider.phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            type="password"
            label="Password"
            id="password"
            value={provider.password}
            onChange={handleChange}
          />
          <br/>
          <br/>
          <TextField
            label="Company Name"
            id = "companyName"
            value={provider.companyName}
            onChange={handleChange}
          />
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={handleSubmit}>
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
