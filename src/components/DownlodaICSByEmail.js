import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function DownloadICSByEmail() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = user.email;
  const downloadICS = () => {
    if (email) {
      const fileUrl = `http://localhost:8080/downlodappbyemail?email=${email}`;

      fetch(fileUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Dosya indirilirken hata oluştu.");
          }
          return response.blob();
        })
        .then((blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "randevular.ics";
          document.body.appendChild(a);
          a.click();
          a.remove();
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
        Download Appointments
      </Button>
    </Box>
  );
}
