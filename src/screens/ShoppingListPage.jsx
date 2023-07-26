import { useState, useCallback } from "react";
import Dialog from "../components/Dialog/Dialog";
import { Box, Typography, Container, Drawer } from "@mui/material";
import ItemList from "../components/Lists/ItemList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useItemList } from "../hooks/useItemList";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import CreateItemListForm from "../components/Forms/CreateItemListForm";

export default function ShoppingListPage() {
  const {
    itemList,
    setItemListData,
    createItemList,
    makeItemListPublic,
    disableItemList,
  } = useItemList("shopping");
  const [activeitemListId, setActiveitemListId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { openDrawer, closeDrawer, drawerOpen } = useDrawer();

  const {
    dialogProps: dialogPropsShoppingListDelete,
    handleClickOpen: handleClickOpenShoppingListDelete,
  } = useDialog({
    content:
      "Are you sure you want to delete this shopping list? This action cannot be undone.",
    title: "Delete Shopping List",
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
    dialogProps: dialogPropsShoppingListPublic,
    handleClickOpen: handleClickOpenShoppingListPublic,
  } = useDialog({
    content:
      "Are you sure you want to make this list this shopping list public? This action cannot be undone.",
    title: "Make Shopping List Public",
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

  const shoppingListProps = {
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
            ShoppingList page
          </Typography>
          <ItemList
            {...shoppingListProps}
            type="shoppingitems"
            deleteShoppingList={handleClickOpenShoppingListDelete}
            makePublic={handleClickOpenShoppingListPublic}
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
      {dialogPropsShoppingListDelete.open && (
        <Dialog dialogProps={dialogPropsShoppingListDelete} />
      )}
      {dialogPropsShoppingListPublic.open && (
        <Dialog dialogProps={dialogPropsShoppingListPublic} />
      )}
    </>
  );
}
