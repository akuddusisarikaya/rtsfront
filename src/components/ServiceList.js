import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, Box } from "@mui/material";

export default function ServiceList() {
  const [error, setError] = React.useState(null);
  const nav = useNavigate();
  const [selectedService, setSelectedService] = React.useState(null)
  const provider = JSON.parse(localStorage.getItem("provider"))


  const handleService = async (e) => {
    setSelectedService(e.target.value)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `http://localhost:8080/provider/deleteservice?providerID=${provider.ID}&index=${selectedService}`,
        {
          method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        }
      )
      if (!response.ok) {
        throw new Error("Services did not deleted");
      }
    } catch (error) {
      setError(error.message)
    }
  }
  
  // JSON veriyi JavaScript dizisine çevirme işlemi
  let services = [];
  try {
    services = JSON.parse(localStorage.getItem("services")) || [];
  } catch (error) {
    console.error("Failed to parse services:", error);
  }

  return (
    <Box>
      <br />
      <Button color="secondary" onClick={()=> {nav(-1)}}>Back</Button>
      <br />
      {error && <h5>{error}</h5>}
      <br/>
      <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
        <h3 style={{ marginLeft: "35%" }}>Services</h3>
        {services.length > 0 ? (
          services.map((service, index) => (
            <ListItem
              key={service.index}
              style={{
                marginTop: "5px",
              }}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={service.service}/>
              <Button color="secondary" value={service.index} onClick={handleService} variant="contained">delete</Button>
            </ListItem>
          ))
        ) : (
          <Box>
            <p style={{ textAlign: "center", color: "grey" }}>No services available.</p>
          </Box>
        )}
      </List>
    </Box>
  );
}
