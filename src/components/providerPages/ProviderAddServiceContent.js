import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Card, Button, TextField } from "@mui/material";

export default function ProviderAddServiceContent() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [service, setService] = React.useState("");
  const [price, setPrice] = React.useState("");
  const nav = useNavigate();
  let userServices = user.services || [];

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleService = (e) => {
    setService(capitalize(e.target.value));
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async () => {
    if (!service || service.length < 3) {
      setError("Please enter a valid service name.");
      return;
    }

    const newService = `${service} - ₺${price}`;
    userServices.push(newService);

    const updatedUser = { ...user, services: userServices };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://54.93.232.137:8080/provider/updateuser?id=${user._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ services: userServices }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add service. Please try again.");
      } else {
        alert('Service added successfully!');
        nav(0);
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
        <Button color="secondary" onClick={() => nav(-1)}>
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
          error={!!error && service.length < 3}
          helperText={!!error && service.length < 3 ? "Service name must be at least 3 characters." : ""}
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
          disabled={loading}
        >
          Save
        </Button>
      </Card>
    </Box>
  );
}
