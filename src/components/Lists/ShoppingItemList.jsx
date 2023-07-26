import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function ShoppingItemList({
  items,
  toggleComplete,
  showItemDetails,
}) {
  console.log(items);
  return (
    <List
      sx={{
        maxHeight: { xs: "68vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {items?.map((item) => (
        <ShoppingListItem
          toggleComplete={toggleComplete}
          key={item._id}
          item={item}
          showItemDetails={showItemDetails}
        />
      ))}
    </List>
  );
}

function ShoppingListItem({ item, toggleComplete, showItemDetails }) {
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
        {item.required && (
          <PriorityHighIcon sx={{ color: "#FF5733", marginRight: "1rem" }} />
        )}
        <ListItemText primary={item.itemTitle} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {item.type && <Chip label={item.type} color="primary" />}
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
