import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
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
  Typography,
  Button,
  Avatar,
  Tooltip,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";

import groupIcon from "../../icon.png";

import { setTitle } from "../../redux/navigationSlice";
import { useAuth } from "../../hooks/useAuth";

const drawerWidth = 340;
const settings = [
  { title: "Profile", path: "/profile", appBarTitle: "Profile Settings" },
  { title: "Group", path: "/group", appBarTitle: "Group Settings" },
];
const navItems = [
  { title: "Tasks", path: "/tasklists", appBarTitle: "Tasks" },
  { title: "Shopping", path: "/shoppinglists", appBarTitle: "Shopping" },
  { title: "Calendar", path: "/calendar", appBarTitle: "Calendar" },
];

const server = process.env.REACT_APP_BASE_SERVER;

function DrawerAppBar({ window }) {
  const navigate = useNavigate();

  function signOutCallback() {
    navigate("/signin");
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const appBarTitle = useSelector((state) => state.navigation.appBarTitle);
  const displayName = useSelector((state) => state.userSettings.displayName);
  const avatar = useSelector((state) => state.userSettings.avatar);
  const appBarKey = useSelector((state) => state.navigation.appBarKey);
  const { signOut } = useAuth();
  const dispatch = useDispatch();

  function handleDrawerToggle() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function handleNavItemClick(item) {
    navigate(item.path);
    dispatch(setTitle(item?.appBarTitle));
    setIsDrawerOpen(false);
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          alt="Group Hub Icon"
          src={groupIcon}
          sx={{
            marginRight: "1rem",
          }}
        />
        <Typography variant="h6" sx={{ my: 2, fontWeight: "700" }}>
          Group Hub
        </Typography>
      </Box>
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
          {/* Add the icon next to the Group Hub headers */}
          <Avatar
            alt="Group Hub Icon"
            src={groupIcon}
            sx={{
              display: { xs: "none", sm: "block", mr: 1 },
              marginRight: "1rem",
            }}
          />
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
                  key={appBarKey}
                  alt={displayName}
                  src={`${server}${avatar}`}
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
                <Typography
                  onClick={() => signOut(signOutCallback)}
                  textAlign="center"
                >
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
