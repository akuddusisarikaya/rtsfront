import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = "Europe/Istanbul";

export default function AppointmentsList() {
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [emails, setEmails] = React.useState([]);

  const formedTime = (time) => {
    return dayjs(time).tz(TIMEZONE).format("HH:mm");
  };

  // Admin mevcutsa, şirket ID'si ile providerların e-posta adreslerini çek
  React.useEffect(() => {
    if (!admin) return;

    const fetchEmails = async () => {
      try {
        const company = admin.CompanyID;
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/admin/getprovidersemails?companyID=${company}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Data did not catch");
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEmails();
  }, [admin]);

  // E-posta adreslerine göre randevuları çek
  React.useEffect(() => {
    const fetchAppointmentsByEmails = async () => {
      try {
        const token = sessionStorage.getItem("token");

        // Tüm e-posta adresleri için randevuları çek
        const appointmentPromises = emails.map(async (email) => {
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
            throw new Error("Failed to fetch appointments");
          }

          return response.json();
        });

        // Tüm randevuları birleştir
        const allAppointments = await Promise.all(appointmentPromises);
        setAppointments(allAppointments.flat()); // Tüm randevuları düz bir diziye çevir
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (emails.length > 0) {
      fetchAppointmentsByEmails();
    }
  }, [emails]);

  // Eğer admin yoksa mevcut davranış
  React.useEffect(() => {
    if (admin) return; // Admin varsa bu bölümü atla

    const fetchAppointments = async () => {
      try {
        const provider = JSON.parse(sessionStorage.getItem("provider"))
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/provider/getallproviderapp?email=${provider.Email}`,
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
  }, []); // Admin yoksa çalış

  const goBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <br />
      <Button color="secondary" onClick={goBack}>
        Back
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Provider Email</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">StartTime</TableCell>
              <TableCell align="center">EndTime</TableCell>
              <TableCell align="center">CustomerEmail</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments !== null ? (
              appointments.map((appointment) => (
                <TableRow key={appointment.ID}>
                  <TableCell align="center">
                    {appointment.ProviderEmail}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(appointment.Date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {formedTime(appointment.StartTime)}
                  </TableCell>
                  <TableCell align="center">
                    {formedTime(appointment.EndTime)}
                  </TableCell>
                  <TableCell align="center">
                    {appointment.CustomerEmail || "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    {appointment.Activate ? "Active" : "Inactive"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Appointments Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
