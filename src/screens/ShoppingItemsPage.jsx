import { useState, useEffect } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import ShoppingItemList from "../components/Lists/ShoppingItemList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import CreateShoppingItemForm from "../components/Forms/CreateShoppingItemForm";
import ShoppingItemDetails from "../components/Details/ShoppingItemDetails";
import Dialog from "../components/Dialog/Dialog";
import { useParams } from "react-router-dom";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import { useDispatch } from "react-redux";
import { setTitle } from "../redux/navigationSlice";

export default function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const { itemListId } = useParams();

  const {
    drawerOpen: ctDrawerOpen,
    openDrawer: ctOpenDrawer,
    closeDrawer: ctCloseDrawer,
  } = useDrawer();
  const {
    drawerOpen: tdDrawerOpen,
    openDrawer: tdOpenDrawer,
    closeDrawer: tdCloseDrawer,
  } = useDrawer();
  const {
    state,
    setItemData,
    createItem,
    toggleComplete,
    deleteItem,
    getItem,
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
          tdCloseDrawer();
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
    tdOpenDrawer();
  }

  function hideItemDetailsHandler() {
    setSelectedItem(null);
    tdCloseDrawer();
  }

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            {itemList?.listTitle}
          </Typography>
          <ShoppingItemList
            items={items}
            toggleComplete={toggleComplete}
            deleteItem={handleClickOpen}
            showItemDetails={showItemDetailsHandler}
          />
        </Box>
      </Container>
      <Drawer anchor={"right"} open={ctDrawerOpen} onClose={ctCloseDrawer}>
        <CreateShoppingItemForm
          closeDrawer={ctCloseDrawer}
          setItemData={setItemData}
          createItem={createItem}
        />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={tdDrawerOpen}
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
      <SingleActionFab onClick={ctOpenDrawer} />
    </>
  );
}
