import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function SmallProviders() {
  const [error, setError] = React.useState(null);
  const [providers, setProviders] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin")) || {}; // Admin verisini JSON.parse ile çek

    if (!admin.CompanyID) {
      // Admin veya CompanyID yoksa erken çıkış yap
      setError("Admin veya CompanyID bilgisi mevcut değil.");
      return;
    }

    const fetchProviders = async () => {
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${admin.CompanyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Veri alınamadı.");
        }
        const data = await response.json();
        setProviders(data || []); // Veri boşsa boş dizi olarak ayarla
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProviders(); // Fetch fonksiyonunu çağır
  }, []); // Sadece ilk renderda çalışacak

  const detailClick = () => {
    navigate("/adminproviderslist");
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3>Service Providers</h3>
      {error && <h5>{error}</h5>}
      {providers.length > 0 ? ( // providers dizisinin dolu olup olmadığını kontrol et
        providers.slice(0, 5).map((provider, index) => (
          <ListItem key={provider.ID || index}> {/* Benzersiz bir ID kullan veya index fallback */}
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={provider.Name}
              secondary={`${provider.Phone}  /  ${provider.Email}`}
            />
          </ListItem>
        ))
      ) : (
        <Box>No providers available</Box> // Eğer providers boşsa kullanıcıya bilgi ver
      )}

      <Button color="secondary" variant="contained" onClick={detailClick}>
        See Others
      </Button>
    </List>
  );
}
