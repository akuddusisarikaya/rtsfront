import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  CardActions,
  TextField,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import AdminDrawer from "./adminPages/AdminDrawer";
import ManagerDrawer from "./managerPages/ManagerDrawer";

const roles = [
  {
    key: 1,
    name: "Admin",
    value: "Admin",
  },
  {
    key: 2,
    name: "Manager",
    value: "Manager",
  },
  {
    key: 3,
    name: "Provider",
    value: "Provider",
  },
  {
    key: 4,
    name: "User",
    value: "User",
  },
];

export default function AddNewProvider() {
  const [error, setError] = React.useState(null);
  const [provider, setProvider] = React.useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const userRole = user.role.toLowerCase();
  const [companyID, setCompanyID] = React.useState(user.company_id);
  const [companyName, setCompanyName] = React.useState(user.company_name);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProvider((prevProvider) => ({
      ...prevProvider,
      [id]: value,
    }));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `https://18.185.69.244:8080/admin/getuserbyemail?email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setProvider(data);
      setSnackbar({
        open: true,
        message: "User found successfully!",
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setSnackbar({
        open: true,
        message: "Error fetching user",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  React.useEffect(() => {
    const handleRoleChange = async () => {
      if (role === "User") {
        setCompanyID("-");
        setCompanyName("-");
      }
    };
    handleRoleChange();
  });

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `https://18.185.69.244:8080/admin/updateuser?id=${provider.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: role,
            company_id: companyID,
            company_name: companyName,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update provider");
      setSnackbar({
        open: true,
        message: "Provider updated successfully!",
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setSnackbar({
        open: true,
        message: "Failed to update provider",
        severity: "error",
      });
    }
  };

  return (
    <Box>
      {userRole === "admin" ? <AdminDrawer/> : <ManagerDrawer/>}
      <Box className="dashboardNotMobile">
        <Button color="secondary" onClick={goBack}>
          Back
        </Button>
        <br />
        <Card className="userDetailCard">
          {error && <h4>{error}</h4>}
          <br />
          <TextField
            fullWidth
            onChange={handleEmail}
            label="Search user by email"
            onKeyDown={handleEnter}
          />
          <Button onClick={handleSearch}>Search</Button>
          <CardContent>
            <h5>Name:</h5>
            <TextField
              disabled
              fullWidth
              id="name"
              value={provider?.name || ""}
              onChange={handleChange}
            />
            <br />
            <h5>Role:</h5>
            <TextField
              select
              fullWidth
              id="role"
              label={provider.role}
              value={role}
              onChange={handleRole} // Rolü güncelle
            >
              {roles.map((ro) => (
                <MenuItem key={ro.key} value={ro.value}>
                  {ro.name}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <h5>Email:</h5>
            <TextField
              disabled
              fullWidth
              id="email"
              value={provider.email || ""}
              onChange={handleChange}
            />
            <br />
            <h5>Phone:</h5>
            <TextField
              fullWidth
              disabled
              id="phone"
              value={provider.phone || ""}
              onChange={handleChange}
            />
            <br />
            <br />
          </CardContent>
          <CardActions>
            <Button
              style={{ marginLeft: "40%" }}
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
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
    </Box>
  );
}
