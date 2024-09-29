import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function SendICSByCompany() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const companyID = user.company_id;
  const downloadICS = () => {
    if (companyID) {
      const fileUrl = `http://54.93.232.137:8080/${role}/sendappbycompany?companyId=${companyID}`;
      const token = sessionStorage.getItem("token");

      fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Email gönderilirken hata oluştu.");
          }
          return response.blob();
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    } else {
      alert("Lütfen geçerli bir company_id girin.");
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={downloadICS}
        style={{ padding: "10px" }}
      >
        Send All Appointments document
      </Button>
    </Box>
  );
}
