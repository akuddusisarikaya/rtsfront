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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = "Europe/Istanbul";

export default function SmallAppointments({ size }) {

  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const formedTime = (time) => {
    return dayjs(time).tz(TIMEZONE).format("HH:mm");
  };
  

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const email = sessionStorage.getItem("email");
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/admin/getallproviderapp?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  const listClassSize = size === "large" ? "listSizeLarge" : "listSizeSmall";

  const detailClick = () => {
    navigate("/adminmanappointments");
  };

  return (
    <Box className={listClassSize}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <h3>Appointments</h3>
        {appointments.slice(0,5).map((appointment) => (
          <ListItem key={appointment.key}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={appointment.ProviderEmail} secondary={`${formedTime(appointments.StartTime)}-${formedTime(appointment.EndTime)}`} />
          </ListItem>
        ))}
        <Button color="secondary" variant="contained" onClick={detailClick}>
          See Others
        </Button>
      </List>
    </Box>
  );
}
