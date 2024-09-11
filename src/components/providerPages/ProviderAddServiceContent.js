import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Card, Button, TextField } from "@mui/material";

export default function ProviderAddServiceContent() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const provider = JSON.parse(sessionStorage.getItem("provider"));
  const [service, setService] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [record, setRecord] = React.useState([]);
  const nav = useNavigate();

  // String ilk harfini büyük yapar
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Hizmet adını ayarlar
  const handleService = (e) => {
    setService(capitalize(e.target.value));
  };

  // Fiyatı ayarlar
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  // Record'u güncellemek için ayrı bir useEffect kullan
  React.useEffect(() => {
    if (!service) return;

    if (service.length < 3) {
      setError("Please enter a valid service name.");
      return;
    }

    if (!price || isNaN(price)) {
      setRecord([`${service}`]);
    } else {
      setRecord([`${service} - ₺${price}`]);
    }
  }, [service, price]); // service ve price değiştiğinde çalışır

  const handleSubmit = async () => {
    if (!service || service.length < 3) {
      setError("Please enter a valid service name.");
      return;
    }

    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/provider/addservices?providerID=${provider.ID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Token'ı header'a ekle
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ services: record }), // JSON formatında gönder
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add service. Please try again.");
      } else {
        nav(0); // Başarılı işlem sonrası sayfa yenile
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="serviceDetailBox">
      <br />
      <Card className="serviceDetailCard">
        <br />
        <Button color="secondary" onClick={() => {nav(-1)}}>
          BACK
        </Button>
        <br />
        {loading && <h5>Loading...</h5>}
        {error && <h5 style={{ color: "red" }}>{error}</h5>}
        <h1>{service}</h1>
        <br />
        <h3>Service Name:</h3>
        <TextField
          label="Service Name"
          variant="outlined"
          value={service}
          onChange={handleService}
        />
        <br />
        <br />
        <h3>Price:</h3>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={handlePrice}
        />
        <br />
        <br />
        <Button
          color="secondary"
          variant="contained"
          className="serviceEditSaveButton"
          onClick={handleSubmit}
          disabled={loading} // Butonu yüklenirken devre dışı bırak
        >
          Save
        </Button>
      </Card>
    </Box>
  );
}
