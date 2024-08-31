import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AppsIcon from "@mui/icons-material/Apps";

const tabs = [
  { icon: <PersonOutlineIcon color="secondary"/>, name: "User" },
  { icon: <AccountBoxIcon color="secondary" />, name: "Account" },
  { icon: <AppsIcon color="secondary" />, name: "App" },
  { icon: <IntegrationInstructionsIcon color="secondary" />, name: "Integration" },
  { icon: <AssessmentIcon color="secondary" />, name: "Report&Analitics" },
  { icon: <HelpOutlineIcon color="secondary" />, name: "Support&Feedback" },
];

export default function AdminSettingTabs({ onSelectItem }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleTabClick = (item) => {
    onSelectItem(item.name);
  };

  return (
    <Box sx={{ width: "100%" }} >
      <Tabs
        indicatorColor="secondary"
        textColor="secondary"
        centered
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            icon={tab.icon}
            label={tab.name}
            onClick={() => handleTabClick(tab)}
            style={{margin : "1%"}}
          ></Tab>
        ))}
      </Tabs>
    </Box>
  );
}
