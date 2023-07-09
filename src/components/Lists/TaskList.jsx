import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useLongPress } from "use-long-press";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function TaskList({ tasks }) {
  const [longPressOccurred, setLongPressOccurred] = useState(false);

  const handleShortPress = useCallback(() => {
    if (!longPressOccurred) {
      console.log("complete");
    }
  }, [longPressOccurred]);

  const bind = useLongPress(
    () => {
      console.log("Long pressed!");
      setLongPressOccurred(true);
      const timeout = setTimeout(() => {
        setLongPressOccurred(false);
      }, 1000); // Timeout duration to distinguish long press and short press
      return () => clearTimeout(timeout);
    },
    {
      threshold: 1000,
      cancelOnMovement: false,
    }
  );

  useEffect(() => {
    setLongPressOccurred(false);
  }, [tasks]);

  return (
    <List>
      {tasks?.map((task) => (
        <ListItem key={task._id}>
          <ListItemButton onClick={handleShortPress} {...bind()}>
            <ListItemText primary={task.taskTitle} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
