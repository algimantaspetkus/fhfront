import { useState } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import FAIconPicker from "../Picker/FAIconPicker";

import LoadingButton from "@mui/lab/LoadingButton";
import DateTimePicker from "../Picker/DateTimePicker";

export default function CreateGroupForm({
  closeDrawer,
  setItemData,
  createItem,
}) {
  const [selectedIcon, setSelectedIcon] = useState("");
  function setEventDate(date) {
    setItemData("itemDate", date);
  }

  function iconClickHandler(icon) {
    if (icon === selectedIcon) {
      setItemData("itemIcon", undefined);
      setSelectedIcon("");
      return;
    }
    setSelectedIcon(icon);
    setItemData("itemIcon", icon);
  }

  return (
    <Container sx={{ padding: "2rem" }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          Create a Event Item
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
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ flex: 1 }}
            onChange={(e) => setItemData("itemDescription", e.target.value)}
          />
          <DateTimePicker label="Event Date" setDate={setEventDate} />
          <FAIconPicker
            selectedIcon={selectedIcon}
            iconClickHandler={iconClickHandler}
          />
          <LoadingButton type="submit" variant="outlined">
            Create
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
