import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function ShoppingItemList({
  items,
  toggleComplete,
  showItemDetails,
}) {
  // Sort the items by type and name
  const sortedItems = items.slice().sort((a, b) => {
    if (!a.type && b.type) return 1;
    if (a.type && !b.type) return -1;
    if (!a.type && !b.type) return a.itemTitle.localeCompare(b.itemTitle);
    return (
      a.type.localeCompare(b.type) || a.itemTitle.localeCompare(b.itemTitle)
    );
  });

  // Group the items by type
  const groupedItems = sortedItems.reduce((groups, item) => {
    const key = item.type || "Not Grouped";
    groups[key] = [...(groups[key] || []), item];
    return groups;
  }, {});

  return (
    <List
      sx={{
        maxHeight: { xs: "68vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {Object.entries(groupedItems).map(([type, items]) => (
        <Box key={type}>
          <ListSubheader
            sx={{
              fontSize: "1.2rem", // Increase the font size of the subheader
              padding: "1rem 0",
            }}
          >
            {type}
          </ListSubheader>
          {items.map((item) => (
            <Box key={item._id}>
              <ShoppingListItem
                toggleComplete={toggleComplete}
                item={item}
                showItemDetails={showItemDetails}
              />
            </Box>
          ))}
          <Divider sx={{ my: 0.5 }} /> {/* Add a separator between items */}
        </Box>
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
          {item.quantity && (
            <Typography variant="body2" sx={{ marginRight: "1rem" }}>
              {item.quantity}
            </Typography>
          )}
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
