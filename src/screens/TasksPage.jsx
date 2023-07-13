import { useEffect } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import TaskList from "../components/Lists/TaskList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import CreateTaskForm from "../components/Forms/CreateTaskForm";
import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useDrawer } from "../hooks/useDrawer";

export default function TasksPage() {
  const { taskListId } = useParams();
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { state, getTasks, setTaskData, createTask } = useTasks(taskListId);
  const { tasks, taskList } = state;

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            {taskList?.listTitle}
          </Typography>
          <TaskList tasks={tasks} /> {/* Use state.tasks directly */}
        </Box>
      </Container>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <CreateTaskForm
          closeDrawer={closeDrawer}
          setTaskData={setTaskData}
          createTask={createTask}
        />
      </Drawer>
      <SingleActionFab onClick={openDrawer} />
    </>
  );
}
