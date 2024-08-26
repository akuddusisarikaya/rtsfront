import * as React from "react";
import '../../App.css'
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const tabs = [
  { key: 1, name: "User Settings", element: " " },
  { key: 2, name: "Account Managment", element: " " },
  { key: 3, name: "App Settings", element: " " },
  { key: 4, name: "Security Settings", element: " " },
  { key: 5, name: "Integration Settings", element: " " },
  { key: 6, name: "Report & Analitics Settings", element: " " },
  { key: 7, name: "Support & Feedback", element: " " },
];

export default function AdminSettingTabs({ onSelectItem }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabClick = (item) => {
    onSelectItem(item.name);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            label={tab.name}
            onClick={() => handleTabClick(tab)}
          ></Tab>
        ))}
      </Tabs>
    </Box>
  );
}
