import * as React from "react";
import '../../App.css'
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box"
import AdminSettingsTabsForMobile from "./AdminSettingsTabsForMobile";
import AdminSettingsTabsForDesk from "./AdminSettingsTabsForDesk";

export default function AdminSettingsTabs({ onSelectItem }) {
  const isMobile = useMediaQuery("(max-width:768px)");
  
  return (
    <div>
      {isMobile ? (
        <AdminSettingsTabsForMobile onSelectItem={onSelectItem} />
      ) : (
        <Box style={{ position: "sticky", top: 0 }}>
          <AdminSettingsTabsForDesk  onSelectItem={onSelectItem} />
        </Box>
      )}
    </div>
  );
}
