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

export default function FamilyList({
  families,
  defaultFamily,
  handleClick,
  anchorEl,
  activeFamilyId,
  handleClose,
  updateDefaultFamily,
  setDialogDeleteOpen,
  setDialogLeaveOpen,
  getFamilySecret,
}) {
  return (
    <List>
      {families?.map((family) => (
        <ListItem key={family.familyId._id}>
          <ListItemText
            primary={family.familyId.name}
            secondary={`${family.role
              .charAt(0)
              .toUpperCase()}${family.role.slice(1)} - Joined on ${dayjs(
              family.createdAt
            ).format("YYYY-MM-DD HH:mm:ss")}`}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {defaultFamily === family.familyId._id && (
              <Chip
                label="Active"
                sx={{ marginRight: "1rem" }}
                color="primary"
              />
            )}

            <IconButton
              aria-controls={`menu-icon-${family.familyId._id}`}
              aria-haspopup="true"
              onClick={(event) => handleClick(event, family.familyId._id)}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Menu
            id={`menu-${family.familyId._id}`}
            anchorEl={anchorEl}
            open={activeFamilyId === family.familyId._id && Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                updateDefaultFamily(family.familyId._id);
                handleClose();
              }}
            >
              Set active
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>Manage Members</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>Edit</MenuItem> */}
            <MenuItem
              disabled={family.role !== "owner"}
              onClick={() => {
                setDialogDeleteOpen();
                handleClose();
              }}
            >
              Disable
            </MenuItem>
            <MenuItem
              disabled={family.role === "owner"}
              onClick={() => {
                setDialogLeaveOpen();
                handleClose();
              }}
            >
              Leave
            </MenuItem>
            <MenuItem
              disabled={family.role !== "owner"}
              onClick={() => {
                getFamilySecret(family.familyId._id);
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
