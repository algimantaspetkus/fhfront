import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Drawer } from "@mui/material";

import TaskItemsList from "../components/Lists/TaskItemsList";
import SpeedDialFab from "../components/Fab/SpeedDialFab";
import CreateTaskForm from "../components/Forms/CreateTaskForm";
import TaskDetails from "../components/Details/TaskDetails";
import Dialog from "../components/FeedBack/Dialog";
import { ListSkeleton } from "../components/FeedBack/Skeleton";

import { setTitle } from "../redux/navigationSlice";
import { useTaskItems } from "../hooks/useTaskItems";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import { useFilter } from "../hooks/useFilter";

export default function TasksPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const { itemListId } = useParams();

  const {
    drawerOpen: createDrawerOpen,
    openDrawer: createOpenDrawer,
    closeDrawer: createCloseDrawer,
  } = useDrawer();

  const {
    drawerOpen: detailsDrawerOpen,
    openDrawer: detailsOpenDrawer,
    closeDrawer: detailsCloseDrawer,
  } = useDrawer();

  const { filterCompleted, toggleFilterCompleted } = useFilter(
    "filterCompletedTaskItems"
  );

  const {
    state,
    getItem,
    setItemData,
    createItem,
    toggleComplete,
    deleteItem,
    loading,
  } = useTaskItems(itemListId);
  const { items, itemList } = state;

  const { dialogProps: dialogPropsTask, handleClickOpen: handleClickOpenTask } =
    useDialog({
      content:
        "Are you sure you want to delete this task? This action cannot be undone.",
      title: "Delete Task",
      buttons: [
        { title: "Cancel" },
        {
          autofocus: true,
          title: "Delete",
          callback: () => {
            deleteItem(selectedItem);
            detailsCloseDrawer();
          },
        },
      ],
    });

  useEffect(() => {
    dispatch(setTitle(itemList?.listTitle));
  }, [dispatch, itemList]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [items]);

  function showTaskDetailsHandler(itemId) {
    setSelectedItem(itemId);
    detailsOpenDrawer();
  }

  function hideTaskDetailsHandler() {
    setSelectedItem(null);
    detailsCloseDrawer();
  }

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            {itemList?.listTitle}
          </Typography>
          {loading ? (
            <ListSkeleton />
          ) : (
            <TaskItemsList
              items={items.filter((item) => {
                if (filterCompleted) {
                  return item.completed === false;
                }
                return true;
              })}
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
              showItemDetails={showTaskDetailsHandler}
            />
          )}
        </Box>
      </Container>
      <Drawer
        anchor={"right"}
        open={createDrawerOpen}
        onClose={createCloseDrawer}
      >
        <CreateTaskForm
          itemListId={itemListId}
          closeDrawer={createCloseDrawer}
          setItemData={setItemData}
          createItem={createItem}
        />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={detailsDrawerOpen}
        onClose={hideTaskDetailsHandler}
      >
        <TaskDetails
          itemId={selectedItem}
          getItem={getItem}
          toggleComplete={toggleComplete}
          deleteItem={handleClickOpenTask}
          key={key}
        />
      </Drawer>
      {dialogPropsTask.open && <Dialog dialogProps={dialogPropsTask} />}
      <SpeedDialFab
        addItem={createOpenDrawer}
        toggleFilterCompleted={toggleFilterCompleted}
        filterCompleted={filterCompleted}
      />
    </>
  );
}
