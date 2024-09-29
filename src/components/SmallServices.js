import * as React from "react";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function SmallServices() {
  const [error, setError] = React.useState(null);
  const [providers, setProviders] = React.useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const role = user.role.toLowerCase();

  const ServiceList = () => {
    return (
      providers !== null &&
      providers.map((prov, provIndex) => (
        <div key={provIndex}>
          {/* SuperUser olmayan ve servisleri dolu olan provider'ları render ediyoruz */}
          {prov.services !== null &&
            prov.role !== "SuperUser" &&
            prov.services.length > 0 && (
              <>
                <ListItem>
                  <ListItemText secondary={prov.name} />
                </ListItem>
                {prov.services.slice(0,2).map(
                  (service, index) =>
                    service !== "BoşServis - ₺000" && (
                      <ListItem key={index}>
                        <ListItemText sx={{textAlign:"center"}} primary={service} />
                      </ListItem>
                    )
                )}
              </>
            )}
        </div>
      ))
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `https://18.185.69.244:8080/${role}/getproviders?companyId=${user.company_id}`,
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
  }, []);

  const detailClick = () => {
    navigate("/servicelist");
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {error && <h5>{error}</h5>}
        <h3>Service</h3>
        <ServiceList />
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
