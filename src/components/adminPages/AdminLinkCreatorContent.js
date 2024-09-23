import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export default function AdminLinkCreatorContent() {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const companyID = user.company_id;

  const [generatedLink, setGeneratedLink] = React.useState(""); // Oluşturulan bağlantı

  // Bağlantı oluşturma fonksiyonu
  const handleGenerateLink = () => {
    if (!companyID) {
      alert("Company ID info  did not catch! ");
      return;
    }

    // Bağlantıyı oluştur
    const link = `${window.location.origin}/appointment/${companyID}`;
    setGeneratedLink(link);
  };

  return (
    <Box>
      <Button
        onClick={handleGenerateLink}
        variant="contained"
        color="secondary"
        fullWidth
      >
        Create Link
      </Button>
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Yourlink"
        value={generatedLink}
        fullWidth
      />
      <br />
      <br />
      <Button fullWidth variant="contained" color="secondary" onClick={goBack}>
        Back
      </Button>
    </Box>
  );
}
