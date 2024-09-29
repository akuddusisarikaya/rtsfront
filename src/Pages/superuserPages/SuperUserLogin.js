import * as React from "react"
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function SuperUserLogin() {
  const [credentials, setCredentials] = React.useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  // Kullanıcı bilgilerini değiştiren fonksiyon
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  // Giriş işlemi fonksiyonu
  const handleLogin = async () => {
    try {
      const response = await fetch("https://18.185.69.244:8080/superuserlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const result = await response.json();
        sessionStorage.setItem("email", credentials.email)
        sessionStorage.setItem("token", result.token);

        setSnackbar({
          open: true,
          message: result.message || "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/superuserdash", { state: { email: credentials.email } });
        }, 2000);
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

  // Snackbar'ı kapatma fonksiyonu
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Geri gitme fonksiyonu
  const backClick = () => {
    navigate("/");
  };

  // Şifre sıfırlama fonksiyonu
  const passwordReset = () => {
    navigate("/resetpassword");
  };

  const onEnterKey = (e) => {
    if(e.key === 'Enter'){
      handleLogin();
    }
  }

  return (
    <div>
      <Button color="secondary" onClick={backClick}>
        BACK
      </Button>
      <div className="loginBox">
        <h1 style={{ marginTop: "15%" }}>SuperUser Login</h1>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className="loginTextField"
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          className="loginTextField"
          onChange={handleChange}
          onKeyDown={onEnterKey}
        />
        <br />
        <br />
        <Button color="secondary" onClick={passwordReset} className="loginButton">
          Forget Password?
        </Button>
        <br />
        <br />
        <Button color="secondary" variant="contained" className="loginButton" onClick={handleLogin}>
          Login
        </Button>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}  // Mesaj süresini artırdık
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

