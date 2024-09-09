import * as React from "react";
import { useEffect, useState } from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminProfileContent() {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const nav = useNavigate()

  const goLinkCreat = () => {
    nav("/adminlinkcreate")
  }

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem('email');
        const response = await fetch(`http://localhost:8080/admin/adminsget?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token'i header'a ekliyoruz
          },
        });

        if (!response.ok) {
          throw new Error("Admin bilgileri alınamadı.");
        }

        const data = await response.json();
        setAdmin(data);
        localStorage.setItem("admin", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdminDetails();
  },[admin]);

  if (error) {
    return <div>Hata: {error}</div>;
  }

  if (!admin) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Box>
      <h1 style={{ marginLeft: "5%" }}>Admin Profile</h1>

       <Button color="secondary" variant="contained" onClick={goLinkCreat} style={{marginLeft:"65%"}}> Create Link </Button>
      <Card className="adminProfileCard">
        <br />
        <h3>Name:</h3>
        <h2>{admin.Name}</h2>
        <br />
        <h3>Company Name:</h3>
        <h2>{admin.CompanyName}</h2>
        <br />
        <h3>eMail:</h3>
        <h2>{admin.Email}</h2>
        <br />
        <h3>Phone Number:</h3>
        <h2>{admin.Phone}</h2>
        <br />
      </Card>
    </Box>
  );
}