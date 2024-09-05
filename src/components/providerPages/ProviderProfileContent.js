import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";

export default function ProviderProfileContent() {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [provider, setProvider] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/provider/getbyemail?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Token'i header'a ekliyoruz
            },
          }
        );

        if (!response.ok) {
          throw new Error("Povider bilgileri alınamadı.");
        }

        const data = await response.json();
        setProvider(data);
        localStorage.setItem("provider", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      }
    };fetchProviderDetails();
  });
  React.useEffect(() => {
    const fetchProviderCompany = async () => {
      if (!email) return;

      try {
        const response = await fetch(
          `http://localhost:8080/provider/getcompanyforprovider?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Şirket alınamadı");
        const data = await response.json();
        localStorage.setItem("company", data)
      } catch (error) {
        setError("Şirket verisi alınırken hata oluştu: " + error.message);
      }
    };
    fetchProviderCompany();
  }, [email, token]);


  if (error) {
    return <div>Hata: {error}</div>;
  }

  if (!provider) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Box>
      <h1 style={{ marginLeft: "5%" }}>Provider Profile</h1>
      <Card className="adminProfileCard">
        <PersonIcon fontSize="large" className="adminProfilePerson" />
        <br />
        <h3>Name:</h3>
        <h2>{provider.Name}</h2>
        <br />
        <h3>Company Name:</h3>
        <h2>{provider.CompanyName}</h2>
        <br />
        <h3>eMail:</h3>
        <h2>{provider.Email}</h2>
        <br />
        <h3>Phone Number:</h3>
        <h2>{provider.Phone}</h2>
        <br />
      </Card>
    </Box>
  );
}
