import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function DownloadICSByCompany() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const companyID = user.company_id;
  const [todayDate, setTodayDate] = React.useState("");

  React.useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD formatı
    setTodayDate(formattedDate);
  }, []);

  const downloadICS = () => {
    if (companyID) {
      const fileUrl = `http://18.185.69.244:8080/${role}/downlodappbycompany?companyId=${companyID}`;
      const token = sessionStorage.getItem("token");

      fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
          a.download = `${todayDate}_randevular.ics`;
          document.body.appendChild(a);
          a.click();
          a.remove();
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
        Download All Appointments document
      </Button>
    </Box>
  );
}
