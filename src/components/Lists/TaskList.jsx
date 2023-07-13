// import dayjs from "dayjs";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { usePress } from "../../hooks/usePress";

export default function TaskList({ tasks }) {
  const longPress = () => {
    return;
  };

  const shortPress = () => {
    return;
  };

  return (
    <List
      sx={{
        maxHeight: { xs: "70vh", overflow: "visible", sm: "unset" },
        overflow: "auto",
      }}
    >
      {tasks?.map((task) => (
        <TaskListItem
          key={task._id}
          task={task}
          longPress={longPress}
          shortPress={shortPress}
        />
      ))}
    </List>
  );
}

function TaskListItem({ task, longPress, shortPress }) {
  const [complete, setComplete] = useState(false);
  const [taskId, setTaskId] = useState(task._id); // Initialize with the task ID

  const handleShortPress = () => {
    // Wait for 300ms before updating the complete state
    setTimeout(() => {
      setComplete(!complete);
      shortPress();
    }, 1);
  };

  const handleLongPress = () => {
    console.log("Long press");
    longPress();
  };

  const { longPressProps } = usePress({
    shortPressCallback: handleShortPress,
    longPressCallback: handleLongPress,
    id: taskId,
  });

  return (
    <ListItem
      sx={{
        backgroundColor: `rgba(255, 148, 148,${task.priority / 100})`,
        padding: 0,
      }}
    >
      <ListItemButton>
        <ListItemText primary={task.taskTitle} />
        <IconButton
          edge="end"
          aria-label="checkbox"
          sx={{ marginLeft: "1rem" }}
          {...longPressProps}
          onClick={() => setTaskId(task._id)}
        >
          {complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}
