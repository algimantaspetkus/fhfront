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
// import { usePress } from "../../hooks/usePress";

export default function TaskList({
  tasks,
  toggleComplete,
  deleteTask,
  showTaskDetails,
}) {
  // const longPress = () => {
  //   return;
  // };

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
          toggleComplete={toggleComplete}
          key={task._id}
          task={task}
          longPress={deleteTask}
          shortPress={shortPress}
          showTaskDetails={showTaskDetails}
        />
      ))}
    </List>
  );
}

function TaskListItem({
  task,
  // longPress,
  // shortPress,
  toggleComplete,
  showTaskDetails,
}) {
  // const [complete, setComplete] = useState(false);

  // const handleShortPress = () => {
  //   // Wait for 300ms before updating the complete state
  //   setTimeout(() => {
  //     setComplete(!complete);
  //     shortPress();
  //   }, 1);
  // };

  // const handleLongPress = () => {
  //   console.log("Long press");
  //   longPress(task._id);
  // };

  // const { longPressProps } = usePress({
  //   shortPressCallback: handleShortPress,
  //   longPressCallback: handleLongPress,
  //   id: task._id,
  // });

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
