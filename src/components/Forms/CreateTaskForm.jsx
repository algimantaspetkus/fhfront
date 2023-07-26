import { Box, TextField, Typography, Container, Slider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PeoplePicker from "../Picker/PeoplePicker";
import DateTimePicker from "../Picker/DateTimePicker";

export default function CreateGroupForm({
  closeDrawer,
  setTaskData,
  createTask,
  itemListId,
}) {
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
            createTask(event);
            closeDrawer();
          }}
        >
          <TextField
            label="Task Title"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setTaskData("taskTitle", e.target.value)}
            required
          />
          <TextField
            label="Task Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ flex: 1 }}
            onChange={(e) => setTaskData("taskDescription", e.target.value)}
          />
          <PeoplePicker setTaskData={setTaskData} itemListId={itemListId} />
          <DateTimePicker setTaskData={setTaskData} />
          <Box>
            <Typography gutterBottom>Priority</Typography>
            <Slider
              defaultValue={0}
              aria-label="Priority"
              valueLabelDisplay="auto"
              onChange={(_, priority) => setTaskData("priority", priority)}
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
