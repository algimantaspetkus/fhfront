import { useState, useEffect } from "react";
import Dialog from "../components/FeedBack/Dialog";
import { Box, Typography, Container, Drawer } from "@mui/material";
import EventItems from "../components/Lists/EventItems";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useEvent } from "../hooks/useEvent";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import CreateEventItemForm from "../components/Forms/CreateEventItemForm";

export default function Calendar() {
  const [activeItemId, setActiveItemId] = useState(null);
  const { openDrawer, closeDrawer, drawerOpen } = useDrawer();
  const { addItem, setItemData, deleteItem, items } = useEvent();

  const {
    dialogProps: dialogPropsTaskListDelete,
    handleClickOpen: handleClickOpenTaskListDelete,
  } = useDialog({
    content:
      "Are you sure you want to delete this event? This action cannot be undone.",
    title: "Delete Event Item",
    buttons: [
      { title: "Cancel" },
      {
        autofocus: true,
        title: "Delete",
        callback: () => {
          deleteItem(activeItemId);
        },
      },
    ],
  });

  function onDeleteHandler(itemId) {
    setActiveItemId(itemId);
    handleClickOpenTaskListDelete();
  }

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            Upcoming Events
          </Typography>
          <EventItems
            items={items.upcomingItems}
            deleteItem={onDeleteHandler}
          />
        </Box>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            Recently Passed Events
          </Typography>
          <EventItems items={items.passedItems} deleteItem={onDeleteHandler} />
        </Box>
      </Container>
      <SingleActionFab onClick={openDrawer} />
      <Drawer anchor={"right"} open={drawerOpen} onClose={closeDrawer}>
        <CreateEventItemForm
          closeDrawer={closeDrawer}
          setItemData={setItemData}
          createItem={addItem}
        />
      </Drawer>
      {dialogPropsTaskListDelete.open && (
        <Dialog dialogProps={dialogPropsTaskListDelete} />
      )}
    </>
  );
}
