import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import ServiceList from "../ServiceList";

export default function ProviderServiceListContent() {
  const [error, setError] = React.useState(null);
  const provider = JSON.parse(localStorage.getItem("provider"));

  React.useEffect(() => {
    if (!provider) return;
    setError(null);
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/provider/getservicesforprovider?providerID=${provider.ID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Services did not catch");
        }
        const data = await response.json();
        localStorage.setItem("services", JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, [provider]);

  return (
    <Box>
      {error && <h5>{error}</h5>}
      <ServiceList />
    </Box>
  );
}
