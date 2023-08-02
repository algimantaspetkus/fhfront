import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Drawer } from "@mui/material";

import ShoppingItemList from "../components/Lists/ShoppingItemList";
import SpeedDialFab from "../components/Fab/SpeedDialFab";
import CreateShoppingItemForm from "../components/Forms/CreateShoppingItemForm";
import ShoppingItemDetails from "../components/Details/ShoppingItemDetails";
import Dialog from "../components/FeedBack/Dialog";
import { ListSkeleton } from "../components/FeedBack/Skeleton";

import { setTitle } from "../redux/navigationSlice";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import { useFilter } from "../hooks/useFilter";
import { useDispatch } from "react-redux";

export default function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState(0);

  const dispatch = useDispatch();
  const { itemListId } = useParams();

  const { filterCompleted, toggleFilterCompleted } = useFilter(
    "filterCompletedShoppingItems"
  );

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

  const {
    state,
    setItemData,
    createItem,
    toggleComplete,
    deleteItem,
    getItem,
    loading,
  } = useShoppingItems(itemListId);
  const { items, itemList } = state;

  const { dialogProps, handleClickOpen } = useDialog({
    content:
      "Are you sure you want to delete this item? This action cannot be undone.",
    title: "Delete Item",
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

  function showItemDetailsHandler(itemId) {
    setSelectedItem(itemId);
    detailsOpenDrawer();
  }

  function hideItemDetailsHandler() {
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
            <ShoppingItemList
              items={items.filter((item) => {
                if (filterCompleted) {
                  return item.completed === false;
                }
                return true;
              })}
              toggleComplete={toggleComplete}
              deleteItem={handleClickOpen}
              showItemDetails={showItemDetailsHandler}
            />
          )}
        </Box>
      </Container>
      <Drawer
        anchor={"right"}
        open={createDrawerOpen}
        onClose={createCloseDrawer}
      >
        <CreateShoppingItemForm
          closeDrawer={createCloseDrawer}
          setItemData={setItemData}
          createItem={createItem}
        />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={detailsDrawerOpen}
        onClose={hideItemDetailsHandler}
      >
        <ShoppingItemDetails
          itemId={selectedItem}
          getItem={getItem}
          toggleComplete={toggleComplete}
          deleteItem={handleClickOpen}
          key={key}
        />
      </Drawer>
      {dialogProps.open && <Dialog dialogProps={dialogProps} />}
      <SpeedDialFab
        addItem={createOpenDrawer}
        toggleFilterCompleted={toggleFilterCompleted}
        filterCompleted={filterCompleted}
      />
    </>
  );
}
