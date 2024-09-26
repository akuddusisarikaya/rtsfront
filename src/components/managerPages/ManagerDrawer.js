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

const drawerWidth = 260;

const first = [
  { key: 0, name: "MANAGER PANEL", link: "/manager" },
  { key: 1, name: "User Management", link: "/manageruser" },
  { key: 2, name: "Services & Pricing", link: "/managerservices" },
  { key: 3, name: "Appointments", link: "/managerappointments" },
  //{ key: 4, name: "Payments", link: "/adminpayments" },
  //{ key: 5, name: "Reports & Analytics", link: "/adminreports" },
];
const second = [{ key: 1, name: "Profile", link: "/managerprofile" }];

ManagerDrawer.propTypes = {
  window: PropTypes.func,
};

export default function ManagerDrawer(props) {
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
            navigate("/manager");
          }}
        >
          CARMESOFT S.A.M.
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
            Log Out
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
            <Button variant="contained" onClick={goHome} color="secondary">
              CARMESOFT S.A.M.
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
