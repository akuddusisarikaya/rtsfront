import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import EmailVerification from "../components/EmailVerification";
import NumberVerification from "../components/NumberVerification";

export default function UserProfile() {
  const nav = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [emailVer, setEmailVer] = React.useState(false);
  const [emailButton, setEmailButton] = React.useState(true);
  const [numberVer, setNumberVer] = React.useState(false);
  const [numberButton, setNumberButton] = React.useState(true);
  const [verification, setVerification] = React.useState({});

  const handleEmailVer = async () => {
    setEmailVer(true);
    try {
      await sendEmailVer();
    } catch (err) {
      setError("Failed to send email verification code.");
    }
  };

  const handleNumberVer = () => {
    setNumberVer(true);
  };

  const sendEmailVer = async () => {
    setLoading(true);
    setError(null);
    console.log(userData.ID, userData.Email);
    try {
      const response = await fetch(
        `http://localhost:8080/sendemailvercode?userID=${userData.ID}&email=${userData.Email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (!response.ok) throw new Error("Error sending verification code");
      console.log("Verification code sent successfully");
    } catch (error) {
      setError("Error sending verification code");
    } finally {
      setLoading(false);
    }
  };

  const email = sessionStorage.getItem("email");

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
  };

  // Kullanıcı bilgilerini API'den almak için bir fonksiyon
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
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/protected/userprofile?email=${userEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Token'ı header'a ekle
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Kullanıcı bilgileri alınamadı");
        }
        const data = await response.json();
        sessionStorage.setItem("user", JSON.stringify(data));
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Kullanıcı bilgileri alınırken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [email, location.state]);

  React.useEffect(() => {
    if (userData) {
      const fetchVer = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:8080/getverbyuserid?userID=${userData.ID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setVerification(data);
          console.log(verification.EmailVer)
          if (verification.EmailVer === true) {
            setEmailButton(false);
          }else {
            setEmailButton(true)
          }
          if (verification.NumberVer === true) {
            setNumberButton(false);
          } else {
            setNumberButton(true)
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchVer();
    }
  }, [userData]);

  const goEdit = () => {
    nav("/userprofileedit");
  };
  const goBack = () => {
    nav(-1);
  };
  const handleLogOut = () => {
    logOut();
    goBack();
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
      <Button
        style={{ marginLeft: "65%" }}
        variant="contained"
        color="secondary"
        onClick={handleLogOut}
      >
        Log out
      </Button>
      <br />
      <br />
      <Card className="userProfileCard">
        <br />
        <TextField label="Name" value={userData?.Name || ""} disabled />
        <br />
        <br />
        <TextField label="Email" value={userData?.Email || ""} disabled />
        <br />
        <br />
        <TextField label="Phone" value={userData?.Phone || ""} disabled />
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "25%" }}
          onClick={goEdit}
        >
          Edit
        </Button>
        <br />
        {numberButton ? (
          <Button
          style={{ margin: "2%" }}
          color="secondary"
          variant="contained"
          onClick={handleNumberVer}
        >
          Verificate your Phone Number
        </Button>
        ) : (
          <Box />
        )}
        {emailButton ? (
          <Button
          style={{ margin: "2%" }}
          color="secondary"
          variant="contained"
          onClick={handleEmailVer}
        >
          Verificate your Email
        </Button>
        ) : (
          <Box />
        )}
        {emailVer && (
          <Box>
            <EmailVerification />
          </Box>
        )}
        {numberVer && (
          <Box>
            <NumberVerification />
          </Box>
        )}
      </Card>
      <Button
        style={{ marginLeft: "35%" }}
        variant="contained"
        color="secondary"
        onClick={goApp}
      >
        Appointment
      </Button>
    </Box>
  );
}
