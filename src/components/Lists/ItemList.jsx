// import dayjs from "dayjs";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Menu,
  IconButton,
  MenuItem,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export default function TaskList({
  itemList,
  handleClick,
  anchorEl,
  handleClose,
  activeitemListId,
  deleteItemList,
  makePublic,
  type,
}) {
  const navigate = useNavigate();
  return (
    <List
      sx={{
        maxHeight: { xs: "70vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {itemList?.length === 0 && (
        <ListItem>
          <ListItemText primary="You currently do not have any lists to display" />
        </ListItem>
      )}
      {itemList?.map((list) => (
        <ListItem key={list._id}>
          <ListItemButton onClick={() => navigate(`${list._id}/${type}`)}>
            <ListItemAvatar>
              <Avatar>{list.isPrivate ? <LockIcon /> : <ShareIcon />}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={list.listTitle} />
          </ListItemButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-controls={`menu-${list._id}`}
              aria-haspopup="true"
              onClick={(event) => {
                handleClick(event, list._id);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Menu
            id={`menu-${list._id}`}
            anchorEl={anchorEl}
            open={activeitemListId === list._id && Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              disabled={!list.isPrivate}
              onClick={() => {
                makePublic(list._id);
                handleClose();
              }}
            >
              Make Public
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteItemList(list._id);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </ListItem>
      ))}
    </List>
  );
}
