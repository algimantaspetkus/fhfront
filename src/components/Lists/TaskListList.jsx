import dayjs from "dayjs";
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
  taskLists,
  handleClick,
  anchorEl,
  handleClose,
  activeTaskListId,
}) {
  const navigate = useNavigate();
  return (
    <List>
      {taskLists?.map((taskList) => (
        <ListItem key={taskList._id}>
          <ListItemButton onClick={() => navigate(`${taskList._id}/tasks`)}>
            <ListItemAvatar>
              <Avatar>
                {taskList.isPrivate ? <LockIcon /> : <ShareIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={taskList.listTitle} />
          </ListItemButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-controls={`menu-${taskList._id}`}
              aria-haspopup="true"
              onClick={(event) => {
                handleClick(event, taskList._id);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Menu
            id={`menu-${taskList._id}`}
            anchorEl={anchorEl}
            open={activeTaskListId === taskList._id && Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Mark as Complete</MenuItem>
            <MenuItem onClick={handleClose}>Disable</MenuItem>
          </Menu>
        </ListItem>
      ))}
    </List>
  );
}
