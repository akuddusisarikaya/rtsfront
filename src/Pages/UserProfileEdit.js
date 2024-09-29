import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserProfileEdit() {
  const nav = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const email = sessionStorage.getItem('email')

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const userEmail = email || location.state?.email; // Email'i prop veya state'ten al
      try {
        if (!userEmail) {
          setError("Kullanıcı bilgileri mevcut değil");
          setLoading(false);
          return;
        }

        // API isteği yapılarak kullanıcı profili alınır
        const token = sessionStorage.getItem('token');
        const response = await fetch(`http://18.184.187.176:8080/protected/userprofile?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı header'a ekle
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("Kullanıcı bilgileri alınamadı");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Kullanıcı bilgileri alınırken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [email]);

  // Verileri kaydetme fonksiyonu
  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch("http://18.184.187.176:8080/protected/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Veriler güncellenemedi");
      alert("Veriler başarıyla güncellendi!");
      nav(-1);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme sırasında bir hata oluştu.");
    }
  };

  // Veri düzenleme fonksiyonu
  const handleEdit = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const goBack = () => {
    nav(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <h1 className="userProfileh1">CARMESOFT S.A.M.</h1>
      <br></br>
      <Button style={{ marginLeft: "20%" }} onClick={goBack} color="secondary">
        Back
      </Button>
      <br></br>
      <br></br>
      <Card className="userProfileCard">
        <br></br> <br></br>
        <TextField
          label="Name"
          value={userData?.Name || ''}
          onChange={(e) => handleEdit("Name", e.target.value)}
        />
        <br></br> <br></br>
        <TextField
          label="Email"
          value={userData?.Email || ''}
          onChange={(e) => handleEdit("Email", e.target.value)}
        />
        <br></br> <br></br>
        <TextField
          label="Phone"
          value={userData?.Phone || ''}
          onChange={(e) => handleEdit("Phone", e.target.value)}
        />
        <br></br> <br></br>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "25%" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Card>
    </Box>
  );
}
