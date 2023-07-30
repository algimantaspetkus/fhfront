import { useState, useCallback } from "react";
import Dialog from "../components/FeedBack/Dialog";
import { Box, Typography, Container, Drawer } from "@mui/material";
import ItemList from "../components/Lists/ItemList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useEvent } from "../hooks/useEvent";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import CreateEventItemForm from "../components/Forms/CreateEventItemForm";

export default function Calendar() {
  const [activeitemListId, setActiveitemListId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { openDrawer, closeDrawer, drawerOpen } = useDrawer();
  const { addItem, setItemData } = useEvent();

  const {
    dialogProps: dialogPropsTaskListDelete,
    handleClickOpen: handleClickOpenTaskListDelete,
  } = useDialog({
    content:
      "Are you sure you want to delete this task list? This action cannot be undone.",
    title: "Delete Task List",
    buttons: [
      { title: "Cancel" },
      {
        autofocus: true,
        title: "Delete",
        callback: () => {
          console.log("delete item");
          // disableItemList(activeitemListId);
        },
      },
    ],
  });

  const handleClick = useCallback((event, itemListId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveitemListId(itemListId);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const taskListProps = {
  //   itemList,
  //   handleClick,
  //   anchorEl,
  //   handleClose,
  //   activeitemListId,
  // };

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            Events
          </Typography>
          {/* <ItemList
            {...taskListProps}
            type="tasks"
            deleteItemList={handleClickOpenTaskListDelete}
            makePublic={handleClickOpenTaskListPublic}
          /> */}
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
