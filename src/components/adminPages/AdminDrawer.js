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
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const drawerWidth = 260;

const first = [
  { key: 0, name: "ADMİN PANEL", link: "/admin" },
  //{ key: 1, name: "Dashboard", link: "/admin" },
  { key: 2, name: "User Management", link: "/adminusermanage" },
  { key: 3, name: "Services & Pricing", link: "/adminservicesandprice" },
  { key: 4, name: "Appointments", link: "/adminappointments" },
  //{ key: 5, name: "Payments", link: "/adminpayments" },
  //{ key: 6, name: "Reports & Analytics", link: "/adminreports" },
];
const second = [
  //{ key: 1, name: "Settings", link: "/adminsettings" },
  { key: 2, name: "Profile", link: "/adminprofile" },
];

AdminDrawer.propTypes = {
  window: PropTypes.func,
};

export default function AdminDrawer(props) {
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

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  const goHome = () => {
    logOut();
    navigate("/");
  };

  const drawer = (
    <div>
      <Toolbar>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            navigate("/admin");
          }}
          fullWidth
          startIcon={<HomeIcon/>}
        >
          Admin Panel
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {first.map((button) => (
          <ListItem key={button.key}>
            <ListItemButton onClick={() => navigate(button.link)}>
              {button.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {second.map((button) => (
          <ListItem key={button.key}>
            <ListItemButton onClick={() => navigate(button.link)}>
              {button.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={goHome}
          >
            <LogoutIcon/> Log Out
          </Button>
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
        <Toolbar style={{ backgroundColor: "purple" }}>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Button variant="contained" color="secondary">
              <CalendarTodayIcon/>carme soft s.a.m.
            </Button>
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
