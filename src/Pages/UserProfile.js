import React, { Component } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import EmailVerification from "../components/EmailVerification";
import NumberVerification from "../components/NumberVerification";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      loading: true,
      error: null,
      emailVer: false,
      emailButton: true,
      numberVer: false,
      numberButton: true,
      verification: {},
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile = async () => {
    const { location } = this.props;
    const email = sessionStorage.getItem("email") || location.state?.email;

    if (!email) {
      this.setState({ error: "Kullanıcı bilgileri mevcut değil", loading: false });
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/protected/userprofile?email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Kullanıcı bilgileri alınamadı");
      }

      const data = await response.json();
      sessionStorage.setItem("user", JSON.stringify(data));
      this.setState({ userData: data }, this.fetchVerification);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      this.setState({ error: "Kullanıcı bilgileri alınırken bir hata oluştu" });
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchVerification = async () => {
    const { userData } = this.state;

    if (!userData) return;

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
      this.setState({ verification: data }, () => {
        this.setState({
          emailButton: !data.EmailVer,
          numberButton: !data.PhoneVer,
        });
      });
    } catch (error) {
    }
  };

  handleEmailVer = async () => {
    this.setState({ emailVer: true });
    try {
      await this.sendEmailVer();
    } catch {
      this.setState({ error: "Failed to send email verification code." });
    }
  };

  sendEmailVer = async () => {
    const { userData } = this.state;
    if (!userData) return;

    this.setState({ loading: true, error: null });

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

      if (!response.ok) throw new Error("Error sending verification code");
    } catch {
      this.setState({ error: "Error sending verification code" });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleNumberVer = () => {
    this.setState({ numberVer: true });
  };

  logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
    this.goBack();
  };

  goEdit = () => {
    this.props.navigate("/userprofileedit");
  };

  goBack = () => {
    this.props.navigate(-1);
  };

  goApp = () => {
    this.props.navigate("/appointment");
  };

  render() {
    const { userData, loading, error, emailVer, numberVer, emailButton, numberButton } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <Box>
        <h1 className="userProfileh1">CARMESOFT S.A.M.</h1>
        <br />

        <Button
          style={{ marginLeft: "55%" }}
          variant="contained"
          color="secondary"
          onClick={this.goApp}
        >
          Appointment
        </Button>
        <Button
          style={{ marginLeft: "5%" }}
          variant="contained"
          color="secondary"
          onClick={this.logOut}
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
          <TextField label={emailButton? "Email" : "Verificated Email" } value={userData?.Email || ""} disabled />
          <br />
          <br />
          <TextField label="Phone" value={userData?.Phone || ""} disabled />
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "25%" }}
            onClick={this.goEdit}
          >
            Edit
          </Button>
          <br />
          {numberButton && (
            <Button
              style={{ margin: "2%" }}
              color="secondary"
              variant="contained"
              onClick={this.handleNumberVer}
            >
              Verificate your Phone Number
            </Button>
          )}
          {emailButton && (
            <Button
              style={{ margin: "2%" }}
              color="secondary"
              variant="contained"
              onClick={this.handleEmailVer}
            >
              Verificate your Email
            </Button>
          )}
          {emailVer && <EmailVerification />}
          {numberVer && <NumberVerification />}
        </Card>
      </Box>
    );
  }
}

// Fonksiyonu bileşene iletmek için bir sarmalayıcı fonksiyon
function WithNavigateAndLocation(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return <Component {...props} navigate={navigate} location={location} params={params} />;
  };
}

export default WithNavigateAndLocation(UserProfile);
