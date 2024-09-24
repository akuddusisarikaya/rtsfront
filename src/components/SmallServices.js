import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function SmallServices() {
  const [isProvider, setIsProvider] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [provider, setProvider] = React.useState({});
  const [providers, setProviders] = React.useState([]);
  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const role = user.role.toLowerCase();

  React.useEffect(() => {
    if (role === "provider") {
      setIsProvider(true);
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await fetch(
            `http://localhost:8080/provider/getuserbyemail?email=${user.email}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) throw new Error("Error fetching data");
          const data = await response.json();
          setProvider(data);
          setUser(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    } else {
      setIsProvider(false);
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await fetch(
            `http://localhost:8080/${role}/getproviders?companyId=${user.company_id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) throw new Error("Error fetching data");
          const data = await response.json();
          setProviders(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [user]);

  const detailClick = () => {
    navigate("/servicelist");
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {error && <h5>{error}</h5>}
        <h3>Service</h3>
        {isProvider ? (
          provider.services !== null ? (
            provider.services.map((service, index) =>
              service !== "BoşServis - ₺000" ? (
                <ListItem value={index}>
                  <ListItemText>{service}</ListItemText>
                </ListItem>
              ) : (
                <br />
              )
            )
          ) : (
            <h3>{error}</h3>
          )
        ) : providers !== null ? (
          providers.map((prov) =>
            prov.services !== null ? (
              prov.services.map((service, index) =>
                service !== "BoşServis - ₺000" ? (
                  <ListItem value={index}>
                    <ListItemText>{service}</ListItemText>
                  </ListItem>
                ) : (
                  <br />
                )
              )
            ) : (
              <h3>{error}</h3>
            )
          )
        ) : (
          <h3>{error}</h3>
        )}
        <br />
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={detailClick}
        >
          See Others
        </Button>
      </List>
    </Box>
  );
}
