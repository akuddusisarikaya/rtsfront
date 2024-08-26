import * as React from "react";
import "../App.css";
import { useMediaQuery } from "@mui/material";
import AdminSettingsTabsForMobile from "./AdminSettingsTabsForMobile";
import AdminSettingsTabsForDesk from "./AdminSettingsTabsForDesk";
import { Card } from "@mui/material";

export default function AdminSettingsTabs({ onSelectItem }) {
  const isMobile = useMediaQuery("(max-width:768px)");
  
  return (
    <div>
      {isMobile ? (
        <AdminSettingsTabsForMobile onSelectItem={onSelectItem} />
      ) : (
        <Card>
          <AdminSettingsTabsForDesk onSelectItem={onSelectItem} />
        </Card>
      )}
    </div>
  );
}
