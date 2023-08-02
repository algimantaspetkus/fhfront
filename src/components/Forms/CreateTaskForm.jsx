import { Box, TextField, Typography, Container, Slider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PeoplePicker from "../Picker/PeoplePicker";
import DateTimePicker from "../Picker/DateTimePicker";

export default function CreateGroupForm({
  closeDrawer,
  setItemData,
  createItem,
  itemListId,
}) {
  function setDueByDate(date) {
    setItemData("dueBy", date);
  }

  return (
    <Container sx={{ padding: "2rem" }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          Create a Task
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(event) => {
            createItem(event, closeDrawer);
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setItemData("taskTitle", e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ flex: 1 }}
            onChange={(e) => setItemData("taskDescription", e.target.value)}
          />
          <PeoplePicker setItemData={setItemData} itemListId={itemListId} />
          <DateTimePicker setDate={setDueByDate} label="Due By" />
          <Box>
            <Typography gutterBottom>Priority</Typography>
            <Slider
              defaultValue={0}
              aria-label="Priority"
              valueLabelDisplay="auto"
              onChange={(_, priority) => setItemData("priority", priority)}
            />
          </Box>
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
