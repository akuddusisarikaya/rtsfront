import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
  const [emails, setEmails] = React.useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const navigate = useNavigate();
  let appointmentList = [];

  const formedTime = (time) => {
    return dayjs(time).format("HH:mm");
  };
  const formedDate = (time) => {
    return dayjs(time).tz(TIMEZONE).format("DD/MM/YYYY");
  };

  React.useEffect(() => {
    if (role === "provider") return;

    const fetchEmails = async () => {
      try {
        const company = user.company_id;
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://18.185.69.244:8080/${role}/getproviders?companyId=${company}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch providers");
        const data = await response.json();
        const emailList = data.map((provider) => provider.email);
        setEmails(emailList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  React.useEffect(() => {
    if (role === "provider") return;
    const fetchAppointments = async () => {
      const token = sessionStorage.getItem("token");
      for (let email of emails) {
        try {
          const response = await fetch(
            `http://18.185.69.244:8080/${role}/getallproviderapp?email=${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data !== null) {
              if (data.length > 0) {
                appointmentList = [...appointmentList, ...data];
              } else continue;
            } else continue;
          }
          setAppointments(appointmentList);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      setAppointments(appointmentList);
    };
    fetchAppointments();
  }, [emails]);

  React.useEffect(() => {
    if (role === "manager" || role === "admin") return;
    const fetchAppointments = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://18.185.69.244:8080/provider/getallproviderapp?email=${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("appointments did not catch");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const listClassSize = size === "large" ? "listSizeLarge" : "listSizeSmall";

  const detailClick = () => {
    navigate("/appointmentlist");
  };

  return (
    <Box className={listClassSize}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <h3>Appointments</h3>
        {appointments !== null ? (
          appointments.slice(0, 5).map((appointment) => (
            <ListItem key={appointment.id}>
              <ListItemText
                sx={{textAlign:"center"}}
                primary={`${appointment.provider_name}- ${formedDate(
                  appointment.date
                )}`}
                secondary={`${formedTime(
                  appointment.start_time
                )} - ${formedTime(appointment.end_time)} - ${
                  appointment.activate ? "Active" : "Inactive"
                } - ${appointment.customer_name}`}
              />
            </ListItem>
          ))
        ) : (
          <Box />
        )}
        <br />
      </List>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={detailClick}
      >
        See Others
      </Button>
    </Box>
  );
}
