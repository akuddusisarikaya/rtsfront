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
import ManagerDrawer from "./managerPages/ManagerDrawer";
import AdminDrawer from "./adminPages/AdminDrawer";
import ProviderDrawer from "./providerPages/ProviderDrawer";
dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = "Europe/Istanbul";

export default function AppointmentsList() {
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [emails, setEmails] = React.useState([]);
  const role = user.role.toLowerCase();
  let appointmentList = [];

  const formedTime = (time) => {
    return dayjs(time).tz(TIMEZONE).format("HH:mm");
  };

  React.useEffect(() => {
    if (role === "provider") return;

    const fetchEmails = async () => {
      try {
        const company = user.company_id;
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://18.184.187.176:8080/${role}/getproviders?companyId=${company}`,
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
            `http://18.184.187.176:8080/${role}/getallproviderapp?email=${email}`,
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
          `http://18.184.187.176:8080/provider/getallproviderapp?email=${user.email}`,
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
      }finally{
        setLoading(false)
      }
    };
    fetchAppointments();
  },[]);
  

  const handleDetail = (e) => {
    navigate(`/adminappointmentdetail/${e.target.value}`)
  }

  const goBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      {role === "manager" && <ManagerDrawer/>}
      {role === "admin" && <AdminDrawer/>}
      {role === "provider" && <ProviderDrawer/>}
      <Box className="appListBox">
        <br />
        <Button color="secondary" onClick={goBack}>
          Back
        </Button>
        <TableContainer style={{ width: "120%" }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Provider Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">StartTime</TableCell>
                <TableCell align="center">EndTime</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments !== null ? (
                appointments.map((appointment, index) =>
                  appointment ? (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {appointment.provider_name}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(appointment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        {formedTime(appointment.start_time)}
                      </TableCell>
                      <TableCell align="center">
                        {formedTime(appointment.end_time)}
                      </TableCell>
                      <TableCell align="center">
                        {appointment.customer_name || "noCustomer"}
                      </TableCell>
                      <TableCell align="center">
                        {appointment.activate ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell>
                        <Button onClick={handleDetail} value={appointment.id}>Detail</Button>
                      </TableCell>
                    </TableRow>
                  ) : null
                )
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
    </Box>
  );
}
