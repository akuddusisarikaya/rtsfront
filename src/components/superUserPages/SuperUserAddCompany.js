import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SuperUserAddCompany() {
  const [company, setCompany] = useState({
    name: '',
    adminName: '',
    address: '',
    phone: '',
    managersNumber: 0,
    providersNumber: 0,
    services: [],
  });
  const nav = useNavigate()

  // Form input değişikliklerini yönetmek için
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [id]: id === 'managersNumber' || id === 'providersNumber' ? parseInt(value) : value,
    }));
  };

  // Company ekleme işlemi
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/superuser/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      if (!response.ok) throw new Error('Şirket eklenemedi');
      alert('Şirket başarıyla eklendi!');
      nav('/superuser');
    } catch (error) {
      console.error('Şirket ekleme hatası:', error);
      alert('Şirket eklenirken bir hata oluştu.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
      <h2>Add Company</h2>
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
        id="adminName"
        label="Admin Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.adminName}
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
        value={company.managersNumber}
        onChange={handleChange}
      />
      <TextField
        id="providersNumber"
        label="Providers Number"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={company.providersNumber}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Add Company
      </Button>
    </Box>
  );
}
