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

export default function ShoppingItemList({
  shoppingItems,
  toggleComplete,
  showShoppingItemDetails,
}) {
  return (
    <List
      sx={{
        maxHeight: { xs: "68vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {shoppingItems?.map((shoppingItem) => (
        <ShoppingItemListItem
          toggleComplete={toggleComplete}
          key={shoppingItem._id}
          shoppingItem={shoppingItem}
          showShoppingItemDetails={showShoppingItemDetails}
        />
      ))}
    </List>
  );
}

function ShoppingItemListItem({
  shoppingItem,
  toggleComplete,
  showShoppingItemDetails,
}) {
  function clickHandler(event) {
    const isCheckboxClick =
      event.target.getAttribute("data-checkbox") === "true";
    const isCheckboxChildClick =
      event.target.closest('[data-checkbox="true"]') !== null;

    if (isCheckboxClick || isCheckboxChildClick) {
      toggleComplete(shoppingItem._id, !shoppingItem.completed);
    } else {
      showShoppingItemDetails(shoppingItem._id);
    }
  }

  return (
    <ListItem sx={{ padding: 0 }}>
      <ListItemButton onClick={clickHandler}>
        <ListItemText primary={shoppingItem.shoppingItemTitle} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PriorityBarsMinified priority={shoppingItem.priority} />
          <IconButton
            data-checkbox="true"
            edge="end"
            aria-label="checkbox"
            sx={{ marginLeft: "1rem" }}
          >
            {shoppingItem.completed ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
