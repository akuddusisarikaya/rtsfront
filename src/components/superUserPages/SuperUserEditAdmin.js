import * as React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SuperUserEditAdmin() {
  const [searchName, setSearchName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const nav = useNavigate();
  const [company, setCompany] = React.useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    company_name: "",
    company_id : "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,  
      [id]: value,      
    }));
  };


  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://18.184.187.176:8080/superuser/getuserbyemail?email=${searchName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Şirket bulunamadı");
      const data = await response.json();
      setCompany({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        company_name: data.company_name,
        company_id: data.company_id
      });
    } catch (error) {
      setError("Admin searching error :" + error.message);
      setError("Admin searching error:", error);
    } finally {
      setLoading(false);
    }
  };
  const goBack = () => {
    nav(-1);
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://18.184.187.176:8080/superuser/updateuser?id=${company.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
        }
      );

      if (!response.ok) throw new Error("Admin did not update");
      alert("Admin update success");
      nav("/superuserdash");
    } catch (error) {
      setError("Admin update error:", error);
      alert("Something happen when Admin Update");
    }
  };
  const handleKeyForSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <Button onClick={goBack} color="secondary">
        BACK
      </Button>
      <h2>Edit Admin</h2>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label="Search Admin by Email"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          variant="outlined"
          fullWidth
          onKeyPress={handleKeyForSearch}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <TextField
        id = "id"
        label= "ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.id}
      /> 
      <TextField
        id="name"
        label="Admin Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.name}
        onChange={handleChange}
      />
      <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.email}
        onChange={handleChange}
      />
      <TextField
        id="phone"
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.phone}
        onChange={handleChange}
      />
      <TextField
        id="role"
        label="Role"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.role}
        onChange={handleChange}
      />
      <TextField
        id="company_name"
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.company_name}
        onChange={handleChange}
      />
      <TextField
        id="company_id"
        label="Company ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.company_id}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Save Admin
      </Button>
    </Box>
  );
}
