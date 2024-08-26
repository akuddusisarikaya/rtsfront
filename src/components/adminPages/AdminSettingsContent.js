import React, { useState } from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import AdminSettingTabs from "./AdminSettingsTabs";
import AllAdminSettingsComponents from "../adminSettings/AllAdminSettingsComponents";
import { Button, useMediaQuery } from "@mui/material";
import Footer from "../Footer";

export default function AdminSettingsContent() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box>
      {isMobile ? (
        <Box>
          <AllAdminSettingsComponents selectedItem={selectedItem} />
          <AdminSettingTabs style={{marginTop:"50%"}} onSelectItem={handleSelectItem} />
        </Box>
      ) : (
        <Box>
          <Box>
          <AdminSettingTabs onSelectItem={handleSelectItem} />
          </Box>
          <AllAdminSettingsComponents selectedItem={selectedItem} />
        </Box>
      )}
      <Box className="settingButtons">
        <br></br>
        <br></br>
        <Button color="secondary" variant="contained">Save Settings</Button> <Button color="secondary"  variant="outlined"> Cancel</Button>
      </Box>
      <Footer/>
    </Box>
  );
}
