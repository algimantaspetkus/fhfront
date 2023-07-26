import {
  Box,
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateShoppingItemForm({
  closeDrawer,
  setItemData,
  createItem,
}) {
  return (
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
            label="Item Title"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setItemData("itemTitle", e.target.value)}
            required
          />
          <TextField
            label="Item Type"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setItemData("itemType", e.target.value)}
          />
          <TextField
            label="Item Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ flex: 1 }}
            onChange={(e) => setItemData("itemDescription", e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                onChange={(_, value) => setItemData("itemRequired", value)}
              />
            }
            label="Required"
          />
          <LoadingButton
            // disabled={loading || !email || !password}
            type="submit"
            // loading={loading}
            variant="outlined"
          >
            Create
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
