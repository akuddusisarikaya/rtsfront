import * as React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, TextField, Snackbar, Alert, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

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

export default function EditUser() {
  const { userEmail } = useParams();
  const [error, setError] = React.useState(null);
  const [provider, setProvider] = React.useState({});
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userRole = user.role.toLowerCase();
  const [role, setRole] = React.useState("");
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

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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

  React.useEffect(() => {
    const getProvider = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://54.93.232.137:8080/${userRole}/getuserbyemail?email=${userEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("User did not catch");
        const data = await response.json();
        setProvider(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getProvider();
  }, []);

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://54.93.232.137:8080/${userRole}/updateuser?id=${provider.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
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
    <Box className="dashboardNotMobile">
      <Button color="secondary" onClick={goBack}>
        Back
      </Button>
      <br />
      <Card className="userDetailCard">
        {error && <h4>{error}</h4>}
        <br />
        <CardContent>
          <h5>Name:</h5>
          <TextField
            fullWidth
            id="name"
            label={provider?.name || ""}
            value={name}
            onChange={handleName}
          />
          <br />
          <h5>Role:</h5>
          <TextField
            select
            fullWidth
            id="role"
            label={provider.role || ""}
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
            fullWidth
            id="email"
            label={provider.email || ""}
            value={email}
            onChange={handleEmail}
          />
          <br />
          <h5>Phone:</h5>
          <TextField
            fullWidth
            id="phone"
            label={provider.phone || ""}
            value={phone}
            onChange={handlePhone}
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
  );
}
