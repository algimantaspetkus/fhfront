import dayjs from "dayjs";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEvent } from "../../hooks/useEvent";

export default function EventItems({ items, deleteItem }) {
  return (
    <List
      sx={{
        maxHeight: { xs: "68vh", sm: "72vh", md: "76vh", overflow: "visible" },
        overflow: "auto",
      }}
    >
      {items?.length === 0 && (
        <ListItem>
          <ListItemText primary="You currently do not have any events" />
        </ListItem>
      )}
      {items?.map((item) => (
        <EventListItem key={item._id} item={item} deleteItem={deleteItem} />
      ))}
    </List>
  );
}

function EventListItem({ item, deleteItem }) {
  const { iconArray } = useEvent();
  const itemIcon = iconArray.find((icon) => icon.text === item.type);
  return (
    <ListItem sx={{ padding: 0 }}>
      {itemIcon && (
        <FontAwesomeIcon
          icon={itemIcon.icon}
          style={{ fontSize: "2rem", width: "40px", marginRight: "1rem" }}
        />
      )}
      <ListItemButton onClick={() => deleteItem(item._id)}>
        <ListItemText
          primary={item.eventTitle}
          secondary={item.eventDescription}
        />
        <Box>
          <ListItemText
            primary={dayjs(item.eventDate).format("YYYY-MM-DD")}
            secondary={dayjs(item.eventDate).format("HH:mm:ss")}
            sx={{ textAlign: "right" }}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
