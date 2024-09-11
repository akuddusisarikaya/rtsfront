import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, Box, TextField, MenuItem } from "@mui/material";

export default function ServiceList() {
  const [error, setError] = React.useState(null);
  const nav = useNavigate();
  const provider = JSON.parse(sessionStorage.getItem("provider"));
  const [isProvider, setIsProvider] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const [providers, setProviders] = React.useState([]);
  const providerServices = selectedProvider.Services || [];

  React.useEffect(() => {
    if (!provider) {
      setIsProvider(false);
    } else {
      setIsProvider(true);
      setSelectedProvider(provider);
    }
  }, [provider]);

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin")) || {}; // Buraya taşındı
    if(!admin)return;
    const fetchProviders = async () => {
      if (!admin || !admin.CompanyID) {
        return;
      }

      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${admin.CompanyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Providers did not catch");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProviders();
  }, []); // admin bağımlılıkları kaldırıldı

  const handleService = async (e) => {
    const serviceIndex = e.currentTarget.value; // Butonun değerini doğrudan kullanıyoruz.
    setError(null);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/provider/deleteservice?providerID=${selectedProvider.ID}&index=${serviceIndex}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Services did not delete");
      } else {
        // Başarıyla silindiğinde, silinen öğeyi arayüzden de kaldırın
        const updatedServices = providerServices.filter((_, index) => index !== parseInt(serviceIndex));
        setSelectedProvider({ ...selectedProvider, Services: updatedServices });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  let services = [];
  try {
    services = JSON.parse(sessionStorage.getItem("services")) || [];
  } catch (error) {
    console.error("Failed to parse services:", error);
  }

  return (
    <Box>
      <br />
      <Button
        color="secondary"
        onClick={() => {
          nav(-1);
        }}
      >
        Back
      </Button>
      <br />
      {error && <h5>{error}</h5>}
      <br />
      {isProvider ? (
        <Button variant="contained" color="secondary" onClick={()=> {nav("/provideraddservice")}} > Add Service</Button>
      ) : (
        <TextField select onChange={handleProviderChange}>
          {providers !== null ? (
            providers.map((prov, index) => (
              <MenuItem key={index} value={prov}>
                {prov.Name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Providers Available</MenuItem>
          )}
        </TextField>
      )}
      <h3 style={{ marginLeft: "35%" }}>Services</h3>
      {isProvider ? (
        <Box />
      ) : (
        <Box>
          <h5>{selectedProvider.Name}</h5>
          <List>
            {providerServices.map((serv, index) => (
              <ListItem key={index}>
                <ListItemText primary={serv} />
                <Button
                  color="secondary"
                  value={index}
                  onClick={handleService}
                  variant="contained"
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
        {services.length > 0 ? (
          services.map((service, index) => (
            <ListItem
              key={index}
              style={{
                marginTop: "5px",
              }}
            >
              <ListItemText primary={service.service} />
              <Button
                color="secondary"
                value={index}
                onClick={handleService}
                variant="contained"
              >
                Delete
              </Button>
            </ListItem>
          ))
        ) : (
          <Box>
            <p style={{ textAlign: "center", color: "grey" }}>
              No services available.
            </p>
          </Box>
        )}
      </List>
    </Box>
  );
}
