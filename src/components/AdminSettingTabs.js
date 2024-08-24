import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useMediaQuery } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const tabs = [
  {
    key: 1,
    name: "-User Settings",
    element: " ",
  },
  {
    key: 2,
    name: "-Account Managment",
    element: " ",
  },
  {
    key: 3,
    name: "-App Settings",
    element: " ",
  },
  {
    key: 4,
    name: "-Security Settings",
    element: " ",
  },
  {
    key: 5,
    name: "-Integration Settings",
    element: " ",
  },
  {
    key: 6,
    name: "-Report & Analitics Settings",
    element: " ",
  },
  {
    key: 7,
    name: "-Support & Feedback",
    element: " ",
  },
];

export default function AdminSettingTabs() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile ? (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {tabs.map((tab, index) => (
            <BottomNavigationAction key={tab.key} label={tab.name} />
          ))}
        </BottomNavigation>
      ) : (
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={tab.key} label={tab.name}></Tab>
          ))}
        </Tabs>
      )}
    </Box>
  );
}
