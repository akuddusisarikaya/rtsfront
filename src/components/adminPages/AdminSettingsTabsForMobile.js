import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AppsIcon from "@mui/icons-material/Apps";

const tabs = [
  { icon: <HelpOutlineIcon />, name: "Support&Feedback" },
  { icon: <AssessmentIcon />, name: "Report&Analitics" },
  { icon: <IntegrationInstructionsIcon />, name: "Integration" },
  { icon: <AppsIcon />, name: "App" },
  { icon: <AccountBoxIcon />, name: "Account" },
  { icon: <PersonOutlineIcon />, name: "User" },
];

export default function AdminSettingsTabsForMobile({ onSelectItem }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabClick = (item) => {
    onSelectItem(item.name);
    handleClose();
  };

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{ color: "secondary" }}
      >
        {tabs.map((tab) => (
          <SpeedDialAction
            key={tab.name}
            icon={tab.icon}
            tooltipTitle={tab.name}
            tooltipOpen
            onClick={() => handleTabClick(tab)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
