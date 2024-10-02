import * as React from "react";
import "../App.css";
import { List, ListItem, ListItemText, Typography, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../components/EmailVerification";
import NumberVerification from "../components/NumberVerification";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function UserProfile() {
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [appointments, setAppointments] = React.useState([])
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [edit, setEdit] = React.useState(true);
  const [newUser, setNewUser] = React.useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });
  const [emailButton, setEmailButton] = React.useState(
    !user?.EmailVerification
  );
  const [numberButton, setNumberButton] = React.useState(
    !user?.PhoneVerification
  );

  const formedTime = (time) => {
    return dayjs(time).utc().format("HH:mm");
  };

  const handleNumberVer = () => {
    setNumberButton((prev) => !prev);
  };

  const handleEmailVer = () => {
    setEmailButton((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const logOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  React.useEffect(()=>{
    const fetchAppointments = async () => {
      try {
        const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://3.71.9.9:8080/protected/getuserapp?email=${user.email}`,{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
        }
      )
      if(!response.ok) throw new Error("Appointments did not catch");
      const data = await response.json();
      setAppointments(data)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchAppointments();
  },[])

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `http://3.71.9.9:8080/protected/updateuser?id=${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        // Try to parse error message from response
        let errorMessage = "User did not update";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          setError(error.message);
        }

        throw new Error(errorMessage);
      }

      const updatedUser = await response.json();
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setError(null); // Clear error state if successful
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleEditMode = () => {
    if (!edit) {
      handleSave();
    }
    setEdit((prev) => !prev);
  };

  const goApp = () => {
    navigate("/appointment");
  };

  return (
    <Box>
      <h1 className="userProfileh1">CARMESOFT S.A.M.</h1>
      <br />
      <Button
        style={{ marginLeft: "55%" }}
        variant="contained"
        color="secondary"
        onClick={goApp}
      >
        Appointment
      </Button>
      <Button
        style={{ marginLeft: "5%" }}
        variant="contained"
        color="secondary"
        onClick={logOut}
      >
        Log out
      </Button>
      <br />
      <Card className="appCardForUserProfile">
        {appointments === null ? (
          <CardContent>
            <Typography>
              No appointments 
            </Typography>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="h6">Appointments:</Typography>
            <List>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemText
                      primary={`Appointment: ${formedTime(
                        appointment.start_time
                      )} - ${formedTime(appointment.end_time)}`}
                      secondary={`Status: ${
                        appointment.activate
                          ? `Active - Provider: ${appointment.provider_name} - ${appointment.company_name} `
                          : "Inactive"
                      }`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>
                  No appointments
                </Typography>
              )}
            </List>
          </CardContent>
        )}
      </Card>
      <br />
      <Card className="userProfileCard">
        <br />
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <br />
        <TextField
          label="Name"
          id="name"
          value={newUser?.name}
          disabled={edit}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          label={emailButton ? "Email" : "Verified Email"}
          id="email"
          value={newUser?.email}
          disabled={edit}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          label={numberButton ? "Phone" : "Verified Phone"}
          id="phone"
          value={newUser?.phone}
          disabled={edit}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "25%" }}
          onClick={toggleEditMode}
        >
          {edit ? "Edit" : "Save"}
        </Button>
        <br />
        {numberButton && (
          <Button
            style={{ margin: "2%" }}
            color="secondary"
            variant="contained"
            onClick={handleNumberVer}
          >
            Verify Phone Number
          </Button>
        )}
        {emailButton && (
          <Button
            style={{ margin: "2%" }}
            color="secondary"
            variant="contained"
            onClick={handleEmailVer}
          >
            Verify Email
          </Button>
        )}
        {user.EmailVerification && <EmailVerification />}
        {user.PhoneVerification && <NumberVerification />}
      </Card>
    </Box>
  );
}
