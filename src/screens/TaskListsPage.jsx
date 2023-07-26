import { useState, useCallback } from "react";
import Dialog from "../components/Dialog/Dialog";
import { Box, Typography, Container, Drawer } from "@mui/material";
import ItemList from "../components/Lists/ItemList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useItemList } from "../hooks/useItemList";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import CreateItemListForm from "../components/Forms/CreateItemListForm";

export default function TaskListPage() {
  const {
    itemList,
    setItemListData,
    createItemList,
    makeItemListPublic,
    disableItemList,
  } = useItemList("task");
  const [activeitemListId, setActiveitemListId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { openDrawer, closeDrawer, drawerOpen } = useDrawer();

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
          disableItemList(activeitemListId);
        },
      },
    ],
  });

  const {
    dialogProps: dialogPropsTaskListPublic,
    handleClickOpen: handleClickOpenTaskListPublic,
  } = useDialog({
    content:
      "Are you sure you want to make this list this task list public? This action cannot be undone.",
    title: "Make Task List Public",
    buttons: [
      { title: "Cancel" },
      {
        autofocus: true,
        title: "Make Public",
        callback: () => {
          makeItemListPublic(activeitemListId);
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

  const taskListProps = {
    itemList,
    handleClick,
    anchorEl,
    handleClose,
    activeitemListId,
  };

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            TaskList page
          </Typography>
          <ItemList
            {...taskListProps}
            type="tasks"
            deleteTaskList={handleClickOpenTaskListDelete}
            makePublic={handleClickOpenTaskListPublic}
          />
        </Box>
      </Container>
      <SingleActionFab onClick={openDrawer} />
      <Drawer anchor={"right"} open={drawerOpen} onClose={closeDrawer}>
        <CreateItemListForm
          closeDrawer={closeDrawer}
          setItemListData={setItemListData}
          createItemList={createItemList}
        />
      </Drawer>
      {dialogPropsTaskListDelete.open && (
        <Dialog dialogProps={dialogPropsTaskListDelete} />
      )}
      {dialogPropsTaskListPublic.open && (
        <Dialog dialogProps={dialogPropsTaskListPublic} />
      )}
    </>
  );
}
