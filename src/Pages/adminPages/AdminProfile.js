import * as React from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import AdminDrawer from '../../components/adminPages/AdminDrawer';
import AdminProfileContent from '../../components/adminPages/AdminProfileContent';
import Footer from '../../components/Footer';

export default function AdminProfile() {

  return (
    <Box>
      <AdminDrawer />
      <Box className="dashboardNotMobile">
        <AdminProfileContent />
      </Box>
      <Footer />
    </Box>
  );
}


