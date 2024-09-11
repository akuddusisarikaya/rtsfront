import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserProfile() {
  const nav = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const email = sessionStorage.getItem('email')

  const logOut = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem("email")
  }
  // Kullanıcı bilgilerini API'den almak için bir fonksiyon
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const userEmail = email || location.state?.email; // Email'i prop veya state'ten al
      try {
        if (!userEmail) {
          setError('Kullanıcı bilgileri mevcut değil');
          setLoading(false);
          return;
        }

        // API isteği yapılarak kullanıcı profili alınır 
        const token = sessionStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/protected/userprofile?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı header'a ekle
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Kullanıcı bilgileri alınamadı');
        }
        const data = await response.json();
        setUserData(data); 
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError('Kullanıcı bilgileri alınırken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [email, location.state]);

  const goEdit = () => {
    nav("/userprofileedit");
  };
  const goBack = () => {
    nav(-1);
  };
  const handleLogOut = () => {
    logOut();
    goBack();
  }
  const goApp = () => {
    nav("/appointment");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <h1 className="userProfileh1">CARMESOFT S.A.M.</h1>
      <br />
      <Button style={{ marginLeft: "65%" }} variant="contained" color="secondary" onClick={handleLogOut}>
        Log out
      </Button>
      <br />
      <br />
      <Card className="userProfileCard">
        <br />
        <TextField label="Name" value={userData?.Name || ''} disabled />
        <br />
        <TextField label="Email" value={userData?.Email || ''} disabled />
        <br />
        <TextField label="Phone" value={userData?.Phone || ''} disabled />
        <br />
        <Button variant="contained" color="secondary" style={{ marginLeft: "25%" }} onClick={goEdit}>
          Edit
        </Button>
      </Card>
      <Button style={{ marginLeft: "35%" }} variant="contained" color="secondary" onClick={goApp}>
        Appointment
      </Button>
    </Box>
  );
}
