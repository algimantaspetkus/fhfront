import {
  Box,
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateGroupForm({
  closeDrawer,
  setItemListData,
  createItemList,
  title,
}) {
  return (
    <Container sx={{ padding: "2rem" }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          {title}
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(event) => {
            createItemList(event, closeDrawer);
          }}
        >
          <TextField
            label="List Title"
            variant="outlined"
            sx={{ flex: 1 }}
            maxRows={32}
            minLength={3}
            onChange={(e) => setItemListData("itemListTitle", e.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Switch
                onChange={(_, value) =>
                  setItemListData("itemListIsPrivate", value)
                }
              />
            }
            label="Private"
          />
          <LoadingButton type="submit" variant="outlined">
            Create
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
