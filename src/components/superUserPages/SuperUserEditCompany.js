import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SuperUserEditCompany() {
  const [company, setCompany] = useState({
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
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  // Form input değişikliklerini yönetmek için
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [id]:
        id === "managersNumber" || id === "providersNumber"
          ? parseInt(value)
          : value,
    }));
  };

  // Şirket ismi ile arama yapma
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/getcompanybyname?name=${searchName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Şirket bulunamadı");
      const data = await response.json();
      console.log(data);
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
      console.error("Şirket arama hatası:", error);
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
        `http://localhost:8080/superuser/companyupdate?name=${searchName}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
        }
      );
      console.log(company);
      if (!response.ok) throw new Error("Şirket güncellenemedi");
      alert("Şirket başarıyla güncellendi!");
      nav(-1);
    } catch (error) {
      console.error("Şirket güncelleme hatası:", error);
      alert("Şirket güncellenirken bir hata oluştu.");
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
        id="adminId"
        label="Admin ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.admin_id}
        onChange={handleChange}
      />
      <TextField
        id="adminName"
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
        id="managersNumber"
        label="Managers Number"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.managers_number}
        onChange={handleChange}
      />
      <TextField
        id="providersNumber"
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
    </Box>
  );
}
