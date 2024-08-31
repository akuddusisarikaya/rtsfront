import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SuperUserAddAdmin() {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'admin', // Default olarak 'admin' rolü atanabilir
    services: [],
  });

  const nav = useNavigate();

  // Form input değişikliklerini yönetmek için
  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [id]: value,
    }));
  };

  // Admin ekleme işlemi
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
      });

      if (!response.ok) throw new Error('Admin eklenemedi');
      alert('Admin başarıyla eklendi!');
      nav('/superuser'); // Başarıyla ekledikten sonra admin listesine geri dön
    } catch (error) {
      console.error('Admin ekleme hatası:', error);
      alert('Admin eklenirken bir hata oluştu.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
      <h2>Add Admin</h2>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.name}
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
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.password}
        onChange={handleChange}
      />
      <TextField
        id="phone"
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={admin.phone}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
        Add Admin
      </Button>
    </Box>
  );
}
