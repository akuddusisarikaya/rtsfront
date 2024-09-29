import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button, TextField, List, ListItem, ListItemText, Typography, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ManagerProfileContent() {
  const [error, setError] = React.useState(null)
  const nav = useNavigate()
  const [appointments, setAppointments] = React.useState([])
  const user = JSON.parse(sessionStorage.getItem("user"))
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const [isEdit, setIsEdit] = React.useState(false)
  const [adminName, setAdminName] = React.useState(capitalize(user.name))
  const [companyName, setComapnyName] = React.useState(capitalize(user.company_name))
  const [email, setEmail] = React.useState(user.email)
  const [phone, setPhone] = React.useState(user.phone)
  const [updateUser, setUpdateUser] = React.useState({})

  const formedTime = (time) => {
    return dayjs(time).utc().format("HH:mm");
  };

  const handleName = (e) => {
    setAdminName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleCompany = (e) => {
    setComapnyName(e.target.value)
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
  }

  React.useEffect(()=> {
    setUpdateUser({
      name : adminName,
      email : email,
      phone: phone,
      company_name: companyName
    })
  },[])

  const handleClick = async () => {
    if(!isEdit){
      setIsEdit(!isEdit)
      return
    }
    
    try {
      const token = sessionStorage.getItem("token")

      const response = await fetch(
        `http://18.184.187.176:8080/manager/updateuser?id=${user._id}`,
        {
          method:"PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser)
        }
      )
      if(!response.ok) throw new Error("User did not updated");
    } catch (error) {
      setError(error.message)
    }
    setIsEdit(!isEdit)
  }

  const goLinkCreat = () => {
    nav("/adminlinkcreate")
  }

  return (
    <Box className="profileContent">
      <h3 style={{ textAlign:"center" }}>Manager Profile</h3>
      <br/>
      {error&&<h5>{error}</h5>}
      <br/>
       <Button color="secondary" variant="contained" onClick={goLinkCreat} fullWidth> Create Link </Button>
       <br />
       <br />
      <Card className="adminProfileCard">
        <br />
        <h5>Name:</h5>
        <TextField disabled={!isEdit} value={adminName} onChange={handleName}  className="adminTextField"></TextField>
        <br />
        <h5>Company Name:</h5>
        <TextField disabled={!isEdit} value={companyName} onChange={handleCompany} className="adminTextField"></TextField>
        <br />
        <h5>eMail:</h5>
        <TextField disabled={!isEdit} value={email} onChange={handleEmail} className="adminTextField"></TextField>
        <br />
        <h5>Phone Number:</h5>
        <TextField disabled={!isEdit} value={phone} onChange={handlePhone} className="adminTextField"></TextField>
        <br />
        <br/>
        <Button color="secondary" variant="contained" onClick={handleClick}>{isEdit ? "Save" : "Edit"}</Button>
        <br />
        <br />
      </Card>
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
    </Box>
  );
}
