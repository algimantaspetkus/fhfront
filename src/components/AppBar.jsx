import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 340;
const settings = [
  { title: "Profile", path: "/profile" },
  { title: "Family", path: "/family" },
];
const navItems = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Tasks", path: "/tasklists" },
  { title: "Shopping", path: "/shopping" },
  { title: "Wish List", path: "/wishlist" },
  { title: "Calendar", path: "/calendar" },
];

function logoutHandler() {
  localStorage.removeItem("token");
  localStorage.removeItem("displayName");
  window.location.href = "/login";
}

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer state
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsDrawerOpen(false); // Close the drawer on mobile devices
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Family Hub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavItemClick(item.path)}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Family Hub
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.title}
                sx={{ color: "#fff" }}
                onClick={() => handleNavItemClick(item.path)}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "2rem" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={localStorage.getItem("displayName")}
                  src={`http://localhost:8080${localStorage.getItem("avatar")}`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => {
                    handleNavItemClick(setting.path);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <Typography onClick={logoutHandler} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={isDrawerOpen} // Use the new state variable
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
