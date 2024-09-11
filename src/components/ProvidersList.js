import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function ProviderList() {
  const [error, setError] = React.useState(null);
  const [providers, setProviders] = React.useState([])

  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin")) || {}; // Buraya taşındı
    if(!admin)return;
    const fetchProviders = async () => {
      if (!admin || !admin.CompanyID) {
        return;
      }

      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/getproviderbycompany?companyID=${admin.CompanyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Providers did not catch");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProviders();
  }, []);

  
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);
  };
  const goDetails = () =>{
    navigate('/adminuserdetail')
  }

  
  return (
    <Box>
      <br></br>
      <Button color="secondary" onClick={goBack} >Back</Button>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
      <h3 style={{marginLeft:"35%"}}>Service Providers</h3>
      {error&&<h5> {error} </h5>}
      {providers.map((provider) => (
        <ListItem key={provider.key} style={{ marginTop: "5px"}}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={provider.Name} />
          <Button color="secondary" variant="contained" onClick={goDetails}>See Details</Button>
        </ListItem>
      ))}
    </List>
    </Box>
    
  );
}
