import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material"

// Sekme isimleri
const tabs = [ {name:"User"}, {name:"Admin"}, {name:"Manager"}, {name:"Provider"} ];

export default function LoginTab({ selectedTab, onTabChange }) {
  const handleChange = (event, newValue) => {
    onTabChange(newValue); 
  };
  const nav = useNavigate();
  const goBack = () => {
    nav(-1)
  }

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Button variant="contained" color="secondary" onClick={goBack}>BACK</Button>
      <Tabs
        indicatorColor="secondary"
        textColor="secondary"
        centered
        value={selectedTab} // Seçili sekme değeri
        onChange={handleChange} // Sekme değişim işlemi
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.name} style={{ margin: "1%" }} />
        ))}
      </Tabs>
    </Box>
  );
}
