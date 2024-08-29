import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserProfile() {
  const nav = useNavigate();
  const [userData, setUserData] = React.useState(null); // Kullanıcı bilgilerini saklamak için state
  const [loading, setLoading] = React.useState(true); // Yükleme durumu
  const [error, setError] = React.useState(null); // Hata durumu
  const location = useLocation(); // navigate state'ini kullanmak için

  // Kullanıcı bilgilerini API'den almak için bir fonksiyon
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = location.state?.email; // Login bileşeninden gelen email bilgisi
        if (!email) {
          setError('Kullanıcı bilgileri mevcut değil');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/userprofile?email=${email}`);
        if (!response.ok) {
          throw new Error('Kullanıcı bilgileri alınamadı');
        }
        const data = await response.json();
        setUserData(data); // Kullanıcı bilgilerini state'e kaydet
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Kullanıcı bilgileri alınırken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchUserProfile(); // Kullanıcı bilgilerini almak için API çağrısını yap
  }, [location.state]);

  const goEdit = () => {
    nav("/userprofileedit");
  };
  const goBack = () => {
    nav(-1);
  };
  const goApp = () => {
    nav("/appointment");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <h1 className="userProfileh1">CARMESOFT S.A.M.</h1>
      <br />
      <Button style={{ marginLeft: "65%" }} variant="contained" color="secondary" onClick={goBack}>
        Log out
      </Button>
      <br />
      <br />
      <Card className="userProfileCard">
        <br />
        <TextField label="Name" value={userData?.name} disabled />
        <br />
        <TextField label="Email" value={userData?.email} disabled />
        <br />
        <TextField label="Phone" value={userData?.phone} disabled />
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
