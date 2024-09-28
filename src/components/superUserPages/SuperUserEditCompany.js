import * as React from "react";
import "../../App.css";
import { TextField, Button, Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SuperUserEditCompany() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [company, setCompany] = React.useState({
    id: "",
    name: "",
    admin_name: "",
    address: "",
    phone: "",
    admin_id: "",
    managers_number: 0,
    providers_number: 0,
    services: [],
  });
  const [searchName, setSearchName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "managers_number" || id === "providers_number") {
      setCompany((prevCompany) => ({
        ...prevCompany,
        [id]: Math.floor(value),
      }));
    } else {
      setCompany((prevCompany) => ({
        ...prevCompany,
        [id]: value,
      }));
    }
  };

  // Şirket ismi ile arama yapma
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://18.185.69.244:8080/getcompanybyname?name=${searchName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Şirket bulunamadı");
      const data = await response.json();
      // Gelen veriyi state'e doğru bir formatta ekleyin
      setCompany({
        id: data.id,
        name: data.name,
        admin_name: data.admin_name,
        address: data.address,
        phone: data.phone,
        admin_id: data.admin_id,
        managers_number: data.managers_number,
        providers_number: data.providers_number,
        services: data.services,
      });
    } catch (error) {
      setError("Şirket arama hatası: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    nav(-1);
  };

  // Şirket güncelleme işlemi
  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://18.185.69.244:8080/superuser/updatecompany?id=${company.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
        }
      );
      if (!response.ok) throw new Error("Şirket güncellenemedi");
      alert("Şirket başarıyla güncellendi!");
      nav(-1);
    } catch (error) {
      alert("Şirket güncellenirken bir hata oluştu.");
    }
  };

  const handleKeyForSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://18.185.69.244:8080/superuser/deletecompany?id=${company.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Token'ı header'a ekle
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Şirket Silinmedi");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <Button onClick={goBack} color="secondary">
        BACK
      </Button>
      <h2>Edit Company</h2>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label="Search Company by Name"
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
        fullWidth
        id="id"
        label="Comapany ID"
        variant="outlined"
        margin="normal"
        value={company.id}
        disabled
      />
      <TextField
        id="name"
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.name}
        onChange={handleChange}
      />
      <TextField
        id="admin_id"
        label="Admin ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.admin_id}
        onChange={handleChange}
      />
      <TextField
        id="admin_name"
        label="Admin Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.admin_name}
        onChange={handleChange}
      />
      <TextField
        id="address"
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.address}
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
        id="managers_number"
        label="Managers Number"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.managers_number}
        onChange={handleChange}
      />
      <TextField
        id="providers_number"
        label="Providers Number"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.providers_number}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Save Company
      </Button>
      {isMobile ? (
        <Button
          sx={{marginTop:"10%"}}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete Company
        </Button>
      ) : (
        <Button
          sx={{ marginLeft: "35%" }}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete Company
        </Button>
      )}
    </Box>
  );
}
