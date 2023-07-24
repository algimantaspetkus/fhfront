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
import { useSelector, useDispatch } from "react-redux";
import { setTitle } from "../redux/navigationSlice";
import { resetState } from "../redux/userSettingsSlice";

const drawerWidth = 340;
const settings = [
  { title: "Profile", path: "/profile", appBarTitle: "Profile Settings" },
  { title: "Group", path: "/group", appBarTitle: "Group Settings" },
];
const navItems = [
  { title: "Dashboard", path: "/dashboard", appBarTitle: "Dashboard" },
  { title: "Tasks", path: "/tasklists", appBarTitle: "Tasks" },
  { title: "Shopping", path: "/shopping", appBarTitle: "Shopping" },
  { title: "Wish List", path: "/wishlist", appBarTitle: "Wish List" },
  { title: "Calendar", path: "/calendar", appBarTitle: "Calendar" },
];

function DrawerAppBar({ window }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const appBarTitle = useSelector((state) => state.navigation.appBarTitle);
  const displayName = useSelector((state) => state.userSettings.displayName);
  const avatar = useSelector((state) => state.userSettings.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("token");
    dispatch(resetState());
    navigate("/login");
  }

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer state
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavItemClick = (item) => {
    navigate(item.path);
    dispatch(setTitle(item?.appBarTitle));
    setIsDrawerOpen(false); // Close the drawer on mobile devices
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Group Hub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavItemClick(item)}
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
            Group Hub
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            {appBarTitle}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.title}
                sx={{ color: "#fff" }}
                onClick={() => handleNavItemClick(item)}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "2rem" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={displayName}
                  src={`http://localhost:8080${avatar}`}
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
                    handleNavItemClick(setting);
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
          open={isDrawerOpen}
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
