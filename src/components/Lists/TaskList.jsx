import dayjs from "dayjs";
import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { usePress } from "../../hooks/usePress";

export default function TaskList({ tasks }) {
  const [pressed, setPressed] = useState("Nothing pressed yet");
  const longPress = (id) => {
    setPressed("Long press " + id);
  };

  const shortPress = (id) => {
    setPressed("Short press " + id);
  };
  return (
    <>
      <List>
        {tasks?.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            longPress={longPress}
            shortPress={shortPress}
          />
        ))}
      </List>
      <div>{pressed}</div>
    </>
  );
}

function TaskListItem({ task, longPress, shortPress }) {
  const [taskId, setTaskId] = useState(task._id); // Initialize with the task ID

  const handleShortPress = () => {
    shortPress(taskId);
  };

  const handleLongPress = () => {
    longPress(taskId);
  };

  const { longPressProps } = usePress({
    shortPressCallback: handleShortPress,
    longPressCallback: handleLongPress,
  });

  return (
    <ListItem>
      <ListItemButton {...longPressProps} onClick={() => setTaskId(task._id)}>
        <ListItemText primary={task.taskTitle} />
      </ListItemButton>
    </ListItem>
  );
}
