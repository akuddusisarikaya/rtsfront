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

export default function AppointmentsList() {
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
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
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow key={appointment.ID}>
                  <TableCell align="center">{appointment.ProviderEmail}</TableCell>
                  <TableCell align="center">{new Date(appointment.Date).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{appointment.StartTime}</TableCell>
                  <TableCell align="center">{appointment.EndTime}</TableCell>
                  {appointment.CustomerEmail !== null ? (
                    <TableCell align="center">{appointment.CustomerEmail}</TableCell>
                  ):(
                    <div/>
                  )}
                  <TableCell align="center">{appointment.Activate ? 'Active' : 'Inactive'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
