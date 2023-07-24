import { Box, TextField, Typography, Container, Slider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateGroupForm({
  closeDrawer,
  setTaskListData,
  createTaskList,
}) {
  return (
    <Container sx={{ padding: "2rem" }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          Create a Task List
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(event) => {
            createTaskList(event);
            closeDrawer();
          }}
        >
          <TextField
            label="Task Title"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setTaskListData("taskTitle", e.target.value)}
            required
          />
          <TextField
            label="Task Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ flex: 1 }}
            onChange={(e) => setTaskListData("taskDescription", e.target.value)}
          />
          <Box>
            <Typography gutterBottom>Priority</Typography>
            <Slider
              defaultValue={0}
              aria-label="Priority"
              valueLabelDisplay="auto"
              onChange={(_, priority) => setTaskListData("priority", priority)}
            />
          </Box>
          <LoadingButton type="submit" variant="outlined">
            Create
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
