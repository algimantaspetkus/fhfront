import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ChipModal from "../FeedBack/ChipModal";
import { useModal } from "../../hooks/useModal";

export default function CreateShoppingItemForm({
  closeDrawer,
  setItemData,
  createItem,
}) {
  const [currentType, setCurrentType] = useState("");
  const { openModal, closeModal, open } = useModal();

  function chipClickHandler(category) {
    setCurrentType(category);
    setItemData("itemType", category);
    closeModal();
  }

  function chipDeleteHandler() {
    setCurrentType("");
    setItemData("itemType", "");
    closeModal();
  }

  return (
    <>
      <Container sx={{ padding: "2rem" }}>
        <Box sx={{ marginBottom: "3rem" }}>
          <Typography sx={{ marginBottom: "1rem" }} variant="h5">
            Create a Shopping Item
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={(event) => {
              createItem(event);
              closeDrawer();
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              sx={{ flex: 1 }}
              onChange={(e) => setItemData("itemTitle", e.target.value)}
              required
            />
            <TextField
              label="Type"
              variant="outlined"
              sx={{ flex: 1 }}
              onClick={openModal}
              value={currentType}
            />
            <TextField
              label="Quantity"
              variant="outlined"
              sx={{ flex: 1 }}
              onChange={(e) => setItemData("itemQuantity", e.target.value)}
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={(_, value) => setItemData("itemRequired", value)}
                />
              }
              label="Required"
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              sx={{ flex: 1 }}
              onChange={(e) => setItemData("itemDescription", e.target.value)}
            />
            <TextField
              label="URL"
              variant="outlined"
              sx={{ flex: 1 }}
              onChange={(e) => setItemData("itemUrl", e.target.value)}
            />
            <LoadingButton type="submit" variant="outlined">
              Create
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <ChipModal
        open={open}
        closeModal={closeModal}
        chipDeleteHandler={chipDeleteHandler}
        chipClickHandler={chipClickHandler}
      />
    </>
  );
}
