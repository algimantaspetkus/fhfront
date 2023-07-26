import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import { PriorityBarsMinified } from "../UI/PriorityBars";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function TaskItemsList({
  tasks,
  toggleComplete,
  showTaskDetails,
}) {
  return (
    <List
      sx={{
        maxHeight: { xs: "68vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {tasks?.map((task) => (
        <TaskListItem
          toggleComplete={toggleComplete}
          key={task._id}
          task={task}
          showTaskDetails={showTaskDetails}
        />
      ))}
    </List>
  );
}

function TaskListItem({ task, toggleComplete, showTaskDetails }) {
  const clickHandler = (event) => {
    const isCheckboxClick =
      event.target.getAttribute("data-checkbox") === "true";
    const isCheckboxChildClick =
      event.target.closest('[data-checkbox="true"]') !== null;

    if (isCheckboxClick || isCheckboxChildClick) {
      toggleComplete(task._id, !task.completed);
    } else {
      showTaskDetails(task._id);
    }
  };

  return (
    <ListItem sx={{ padding: 0 }}>
      <ListItemButton onClick={clickHandler}>
        <ListItemText primary={task.taskTitle} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PriorityBarsMinified priority={task.priority} />
          <IconButton
            data-checkbox="true"
            edge="end"
            aria-label="checkbox"
            sx={{ marginLeft: "1rem" }}
          >
            {task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
