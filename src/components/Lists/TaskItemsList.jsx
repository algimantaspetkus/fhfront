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
  items,
  toggleComplete,
  showItemDetails,
}) {
  return (
    <List
      sx={{
        maxHeight: { xs: "68vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {items?.map((item) => (
        <TaskListItem
          toggleComplete={toggleComplete}
          key={item._id}
          item={item}
          showItemDetails={showItemDetails}
        />
      ))}
    </List>
  );
}

function TaskListItem({ item, toggleComplete, showItemDetails }) {
  const clickHandler = (event) => {
    const isCheckboxClick =
      event.target.getAttribute("data-checkbox") === "true";
    const isCheckboxChildClick =
      event.target.closest('[data-checkbox="true"]') !== null;

    if (isCheckboxClick || isCheckboxChildClick) {
      toggleComplete(item._id, !item.completed);
    } else {
      showItemDetails(item._id);
    }
  };

  return (
    <ListItem sx={{ padding: 0 }}>
      <ListItemButton onClick={clickHandler}>
        <ListItemText primary={item.taskTitle} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PriorityBarsMinified priority={item.priority} />
          <IconButton
            data-checkbox="true"
            edge="end"
            aria-label="checkbox"
            sx={{ marginLeft: "1rem" }}
          >
            {item.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
