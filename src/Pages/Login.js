import * as React from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Kullanıcı girişi için input değişikliklerini yönetmek için
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  // Kullanıcı girişi için handleLogin fonksiyonu
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const result = await response.json();

        // Başarılı giriş mesajı
        setSnackbar({
          open: true,
          message: result.message || "Login successful!",
          severity: "success",
        });

        // Başarılı giriş sonrası kullanıcı bilgileri ile yönlendirme
        setTimeout(() => {
          navigate("/userprofile", { state: { email: credentials.email } });
        }, 2000); // 2 saniye bekle
      } else {
        const error = await response.json();
        setSnackbar({
          open: true,
          message: error.message || "Login failed!",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setSnackbar({
        open: true,
        message: "An error occurred during login.",
        severity: "error",
      });
    }
  };

  // Snackbar'ı kapatmak için fonksiyon
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Geri butonuna tıklama işlemi
  const backClick = () => {
    navigate("/");
  };

  // Şifre sıfırlama sayfasına yönlendirme
  const passwordReset = () => {
    navigate("/resetpassword");
  };

  return (
    <div>
      <Button color="secondary" onClick={backClick}> BACK </Button>
      <div className="loginBox">
        <h1 style={{ marginTop: "15%" }}> Login </h1>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className="loginTextField"
          onChange={handleChange}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          className="loginTextField"
          onChange={handleChange}
        />
        <br />
        <Button color="secondary" onClick={passwordReset} className="loginButton">
          Forget Password?
        </Button>
        <br />
        <Button color="secondary" variant="contained" className="loginButton" onClick={handleLogin}>
          Login
        </Button>
      </div>

      {/* Pop-up mesajı (Snackbar) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
