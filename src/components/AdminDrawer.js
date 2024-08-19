import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function AdminDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const navigate = useNavigate();

  const dashboardClick = () => {
    navigate("/admin");
  };
  const adminusermanageClick = () => {
    navigate("/adminusermanage");
  };
  const adminservicesClick = () => {
    navigate("/adminservicesandprice");
  };
  const adminappointmentsClick = () => {
    navigate("/adminappointments");
  };
  const adminpaymentsClick = () => {
    navigate("/adminpayments");
  };
  const adminreportsClick = () => {
    navigate("/adminreports");
  };
  const adminsettingsClick = () => {
    navigate("/adminsettings");
  };
  const adminprofileClick = () => {
    navigate("/adminprofile");
  };

  const drawer = (
    <div>
      <Toolbar>
        <h3>CARMESOFT S.A.M.</h3>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={dashboardClick}>DashBoard</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={adminusermanageClick}>
            User Management
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={adminservicesClick}>
            Services & Pricing
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={adminappointmentsClick}>
            Appointments
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={adminpaymentsClick}>Payments</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={adminreportsClick}>
            Reports & Analitics
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={adminsettingsClick}>Settings</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={adminprofileClick}>Profile</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>Log Out</ListItemButton>
        </ListItem>
      </List>
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CARMESOFT S.A.M.
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

AdminDrawer.propTypes = {
  window: PropTypes.func,
};

export default AdminDrawer;
