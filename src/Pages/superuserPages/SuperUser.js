import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import SuperUserTab from "../../components/superUserPages/SuperUserTab";
import SuperUserTableAdmin from "../../components/superUserPages/SuperUserTableAdmin";
import SuperUserTableCompany from "../../components/superUserPages/SuperUserTableCompany";

export default function SuperUser() {
  const [selectedTab, setSelectedTab] = React.useState(0); // Aktif sekme state'i

  // Aktif sekmeyi güncelleyen fonksiyon
  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Box>
      <Card className="newestCard">
        {/* SuperUserTab bileşenine prop olarak handleTabChange fonksiyonu ve aktif sekme gönderilir */}
        <SuperUserTab selectedTab={selectedTab} onTabChange={handleTabChange} />
        
        {/* Aktif sekmeye göre tablo bileşenlerini gösterir */}
        {selectedTab === 0 && <SuperUserTableAdmin />}
        {selectedTab === 1 && <SuperUserTableCompany />}
      </Card>
    </Box>
  );
}
