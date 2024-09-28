import * as React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SuperUserAddCompany() {
  const [error, setError] = React.useState(null);
  const [company, setCompany] = React.useState({
    name: '',
    admin_name: '',
    address: '',  
    phone: '',
    managers_number: 0,
    providers_number: 0,
    services: [],
  });
  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [id]: id === 'managers_number' || id === 'providers_number' ? Math.floor(value) : value,
    }));
  };


  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch('http://18.185.69.244:8080/superuser/createcompany', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(company),
      });

      if (!response.ok) throw new Error('Şirket eklenemedi');
      alert('Şirket başarıyla eklendi!');
      nav(-1);
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
      <h2>Add Company</h2>
      {error && <h3>{error}</h3>}
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
        Add Company
      </Button>
    </Box>
  );
}
