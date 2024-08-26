import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";

const actions = [
  { icon: <SettingsIcon />, name: "User Settings", element: " " },
  { icon: <SettingsIcon />, name: "Account Management", element: " " },
  { icon: <SettingsIcon />, name: "App Settings", element: " " },
  { icon: <SettingsIcon />, name: "Security Settings", element: " " },
  { icon: <SettingsIcon />, name: "Integration Settings", element: " " },
  { icon: <SettingsIcon />, name: "Report & Analytics Settings", element: " " },
  { icon: <SettingsIcon />, name: "Support & Feedback", element: " " },
];

export default function AdminSettingsTabsForMobile({ onSelectItem }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabClick = (item) => {
    onSelectItem(item.name);
    handleClose(); // Menü kapatılır
  };

  return (
    <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleTabClick(action)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
