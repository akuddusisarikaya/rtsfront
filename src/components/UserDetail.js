import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box"

export default function UserDetail() {
  const [error, setError] = React.useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user.role.toLowerCase();
  const [customer, setCustomer] = React.useState({});
  const {userEmail} = useParams();
  const navigate = useNavigate();

  React.useEffect(()=> {
    if (!userEmail) return;
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token")
        const response = await fetch(
          `http://54.93.232.137:8080/${role}/getuserbyemail?email=${userEmail}`,
          {
            method:"GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        )
        if (!response.ok) {
          navigate(-1)
          throw new Error("Customer did not fetch");
        }
        const data = await response.json();
        setCustomer(data)
      } catch (error) {
        setError(error.message)
        navigate(-1)
      }
    }
    fetchUser();
  },[])

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box className="dashboardNotMobile">
      {error&&<h3>{error}</h3>}
      <Card className="userDetailCard">
      <br></br>
      <Button color="secondary" onClick={goBack}>Back</Button>
      <Avatar className="userDetailAvatar"></Avatar>
      <CardContent>
        <h1>{customer.name}</h1>
        <h4>{customer.role}</h4>
        <br></br>
        <br></br>
        <h3>Name:</h3>
        <TextField disabled label={customer.name} ></TextField>
        <br></br>
        <h3>Role:</h3>
        <TextField disabled label={customer.role}></TextField>
        <br></br>
        <h3>E-mail:</h3>
        <TextField disabled label={customer.email}></TextField>
        <br></br>
        <h3>Phone:</h3>
        <TextField disabled label={customer.phone}></TextField>
        <br></br>
      </CardContent>
    </Card>
    </Box>
  );
}
