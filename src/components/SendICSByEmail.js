import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function SendICSByEmail() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const email = user.email;
  const downloadICS = () => {
    if (email) {
      const fileUrl = `https://18.185.69.244:8080/${role}/sendappbyemail?email=${email}`;
      const token = sessionStorage.getItem("token")
      fetch(fileUrl,
        {headers:{
          Authorization: `Bearer ${token}`
        }}
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Eposta gönderilirken hata oluştu.");
          }
          return response.blob();
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    } else {
      alert("Lütfen geçerli bir email girin.");
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Button fullWidth color="secondary" variant="contained" onClick={downloadICS} style={{ padding: "10px" }}>
        Send Appointments
      </Button>
    </Box>
  );
}
