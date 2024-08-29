import * as React from "react";
import "../App.css";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  
  // Kullanıcıdan alınan verileri tutmak için state
  const [user, setUser] = React.useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    passwordAgain: ""
  });

  // Snackbar için state
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success", // success, error, warning, info
  });

  // Kullanıcı input değişikliklerini yönetmek için
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifrelerin eşleştiğini kontrol et
    if (user.password !== user.passwordAgain) {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
      return;
    }

    // Backend'e istek gönder
    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          passwordHash: user.password, // Parola hash'lemesi backend'de yapılacak
          role: "customer", // Varsayılan olarak "customer" rolü
          phone: user.phone
        }),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "User registered successfully!",
          severity: "success",
        });

        // Başarılı kayıt sonrası anasayfaya yönlendirme
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2 saniye bekle
      } else {
        setSnackbar({
          open: true,
          message: "Failed to register user.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setSnackbar({
        open: true,
        message: "Error occurred during registration.",
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

  return (
    <div>
      <br></br>
      <Button color="secondary" onClick={backClick}>BACK</Button>
      <div className="registerBox">
        <h1 style={{ marginTop: "5%" }}>Register</h1>
        <br></br>
        <br></br>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="registerDiv">
            <TextField
              required
              className="registerTextField"
              id="name"
              label="Name"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="surname"
              label="Surname"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="email"
              label="e-Mail"
              type="email"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <TextField
              required
              className="registerTextField"
              id="phone"
              label="Number"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="password"
              label="Password"
              type="password"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <TextField
              className="registerTextField"
              required
              id="passwordAgain"
              label="Password Again"
              type="password"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
          </div>
          <br></br>
          <Button color="secondary" variant="contained" className="registerButton" type="submit">
            Register
          </Button>
        </Box>

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
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

