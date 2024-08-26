import React, { useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import AdminSettingTabs from "./AdminSettingsTabs";
import AllAdminSettingsComponents from "./adminSettings/AllAdminSettingsComponents";

export default function AdminSettingsContent() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
  <Box>
    <AdminSettingTabs onSelectItem={handleSelectItem}/>
    <AllAdminSettingsComponents selectedItem={selectedItem}/>
  </Box>
);
}
