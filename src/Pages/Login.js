import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import UserLogin from "./UserLogin"
import AdminLogin from "./adminPages/AdminLogin";
import ManagerLogin from "./ManagerLogin";
import ProviderLogin from "./providerPages/ProviderLogin";
import LoginTabs from "../components/LoginTabs";

export default function Login() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Box>
      <Box className="newestCard">
        <LoginTabs selectedTab={selectedTab} onTabChange={handleTabChange} />
        
        {selectedTab === 0 && <UserLogin />}
        {selectedTab === 1 && <AdminLogin />}
        {selectedTab === 2 && <ManagerLogin/>}
        {selectedTab === 3 && <ProviderLogin/>}
      </Box>
    </Box>
  );
}
