import dayjs from "dayjs";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  IconButton,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function GroupList({
  groups,
  defaultGroup,
  handleClick,
  anchorEl,
  activeGroupId,
  handleClose,
  updateDefaultGroup,
  setDialogDeleteOpen,
  setDialogLeaveOpen,
  getGroupSecret,
}) {
  return (
    <List
      sx={{
        maxHeight: {
          xs: "70vh",
          sm: "72vh",
          md: "76vh",
          overflow: "visible",
        },
        overflow: "auto",
      }}
    >
      {groups?.map((group) => (
        <ListItem key={group.groupId._id}>
          <ListItemText
            primary={group.groupId.name}
            secondary={`${group.role.charAt(0).toUpperCase()}${group.role.slice(
              1
            )} - Joined on ${dayjs(group.createdAt).format(
              "YYYY-MM-DD HH:mm:ss"
            )}`}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {defaultGroup === group.groupId._id && (
              <Chip
                label="Active"
                sx={{ marginRight: "1rem" }}
                color="primary"
              />
            )}

            <IconButton
              aria-controls={`menu-icon-${group.groupId._id}`}
              aria-haspopup="true"
              onClick={(event) => handleClick(event, group.groupId._id)}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Menu
            id={`menu-${group.groupId._id}`}
            anchorEl={anchorEl}
            open={activeGroupId === group.groupId._id && Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                updateDefaultGroup(group.groupId._id);
                handleClose();
              }}
            >
              Set active
            </MenuItem>
            <MenuItem
              disabled={group.role !== "owner"}
              onClick={() => {
                setDialogDeleteOpen();
                handleClose();
              }}
            >
              Delete
            </MenuItem>
            <MenuItem
              disabled={group.role === "owner"}
              onClick={() => {
                setDialogLeaveOpen();
                handleClose();
              }}
            >
              Leave
            </MenuItem>
            <MenuItem
              disabled={group.role !== "owner"}
              onClick={() => {
                getGroupSecret(group.groupId._id);
                handleClose();
              }}
            >
              Get secret
            </MenuItem>
          </Menu>
        </ListItem>
      ))}
    </List>
  );
}
