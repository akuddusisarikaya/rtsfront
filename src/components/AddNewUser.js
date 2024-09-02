import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Button,
  CardActions,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const roles = [
  {
    value: "Manager",
    label: "Manager",
  },
  {
    value: "Provider",
    label: "Provider",
  },
  {
    value: "Customer",
    label: "Customer",
  },
];

export default function AddNewUser() {
  const [user, setUser] = React.useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    password: "",
  });

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success", // success, error, warning, info
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Değerlerin değişimini yönetmek için
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  // Role seçimi için özel bir handleChange fonksiyonu
  const handleRoleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          passwordHash: user.password,
          role: user.role,
          phone: user.phone,
        }),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "User registered successfully!",
          severity: "success",
        });

        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to register user.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
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
            value={user.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            select
            className="editSelectField"
            label="Role"
            id="role"
            value={user.role}
            onChange={handleRoleChange} // Role seçimini güncelleyen özel fonksiyon
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <br />
          <TextField
            label="eMail"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Phone Number"
            id="phone"
            value={user.phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            type="password"
            label="Password"
            id="password"
            value={user.password}
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
