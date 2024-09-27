import * as React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SuperUserAddAdmin() {
  const [error, setError] = React.useState(null);
  const [admin, setAdmin] = React.useState({
    id: "",
    email: "",
    company_name: "",
    company_id: "",
    role: "Admin",
  });
  const [searchEmail, setSearchEmail] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleKeyForSearch = (e) => {
    if (e.key === "Enter") {
      getAdmin();
    }
  };

  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [id]: value,
    }));
  };

  const getAdmin = async () => {
    if (!searchEmail) return;
    setError(null);
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/superuser/getuserbyemail?email=${searchEmail}`,
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
      if (data.role === "Admin") {
        setError("This person already an Admin");
      } else if (data.role === "SuperUser") {
        setError("You can not view this person");
      } else {
        setAdmin({
          id: data.id,
          email: data.email,
          company_name: data.company_name,
          company_id: data.company_id,
          role: data.role,
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Admin ekleme işlemi
  const handleSubmit = async () => {
    setError(null);
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/superuser/adminadd", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      if (!response.ok) throw new Error("Admin eklenemedi");
      alert("Admin başarıyla eklendi!");
      nav("/superuserdash"); // Başarıyla ekledikten sonra admin listesine geri dön
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <br/>
      <br/>
      <Button color="secondary" onClick={()=> {nav(-1)}} >Back</Button>
      <br/>
      <h2>Search Admin</h2>
      <TextField
        label="Search Admin with email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchEmail}
        onChange={handleSearchChange}
        onKeyPress={handleKeyForSearch}
      />
      <Button color="secondary" variant="contained" onClick={getAdmin}>
        Get Admin
      </Button>
      {error && <h3>{error}</h3>}
      <h2>Add Admin</h2>
      <TextField
        id="id"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.id}
        onChange={handleChange}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.email}
        onChange={handleChange}
      />
      <TextField
        id="company_name"
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.company_name}
        onChange={handleChange}
      />
      <TextField
        id="company_id"
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.company_id}
        onChange={handleChange}
      />
      <TextField
        id="role"
        label="Role"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.role}
        disabled
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        Add Admin
      </Button>
    </Box>
  );
}
