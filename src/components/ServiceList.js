import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, Box, TextField, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import ProviderDrawer from "./providerPages/ProviderDrawer";
import ManagerDrawer from "./managerPages/ManagerDrawer";
import AdminDrawer from "./adminPages/AdminDrawer";

export default function ServiceList() {
  const nav = useNavigate();
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [isProvider, setIsProvider] = React.useState(false);
  const [provider, setProvider] = React.useState({});
  const [providerList, setProviderList] = React.useState([]);
  const role = user.role.toLowerCase();
  const handleProvider = (e) => {
    const selectedProvider = providerList.find(
      (prov) => prov.id === e.target.value
    );
    setProvider(selectedProvider);
  };

  React.useEffect(() => {
    if (role === "provider") {
      setIsProvider(true);

      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await fetch(
            `http://54.93.232.137:8080/provider/getuserbyemail?email=${user.email}`,
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
            `http://54.93.232.137:8080/${role}/getproviders?companyId=${user.company_id}`,
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
          setProviderList(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }
  }, []);

  const removeByIndex = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  const handleAddService = () => {
    if(role === "provider"){
      nav("/provideraddservice")
    } else if(role === "manager"){
      nav("/manageraddservice")
    }
  }

  const handleDelete = async (e) => {
    const index = e.target.value;
    const newServices = removeByIndex(provider.services, index);
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://54.93.232.137:8080/${role}/updateuser?id=${provider.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ services: newServices }),
        }
      );
      if (!response.ok) throw new Error("Service did not delete");
      setProvider({ ...provider, services: newServices });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      {role === "provider" && <ProviderDrawer />}
      {role === "manager" && <ManagerDrawer />}
      {role === "admin" && <AdminDrawer />}
      <Box className="dashboardNotMobile">
        <br />
        {error && <h4 style={{ color: "red" }}>{error}</h4>}
        <Button
          color="secondary"
          onClick={() => {
            nav(-1);
          }}
        >
          Back
        </Button>
        <h3>Service List</h3>
        {isProvider ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => nav("/provideraddservice")}
            fullWidth
          >
            Add Service
          </Button>
        ) : (
         <Box>
          <Button fullWidth color="secondary" variant="contained" onClick={handleAddService}>
            Add Service
          </Button>
          <br />
          <br />
           <TextField
            select
            label="Select Provider"
            value={provider.id || ""}
            onChange={handleProvider}
            fullWidth
          >
            {providerList.length > 0 ? (
              providerList.map(
                (prov) =>
                  (prov.role === "Provider" || prov.role === "Manager") && (
                    <MenuItem key={prov.id} value={prov.id}>
                      {prov.name}
                    </MenuItem>
                  )
              )
            ) : (
              <MenuItem disabled>No Providers Found</MenuItem>
            )}
          </TextField>
         </Box>
        )}
        <br />
        <br />
        <Card>
          <List>
            {provider.services && provider.services.length > 0 ? (
              provider.services.map((service, index) =>
                service !== "BoşServis - ₺000" ? (
                  <ListItem key={index}>
                    <ListItemText primary={service} />
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleDelete}
                      value={index}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ) : (
                  <br/>
                )
              )
            ) : (
              <Box>No services available</Box>
            )}
          </List>
        </Card>
      </Box>
    </Box>
  );
}
