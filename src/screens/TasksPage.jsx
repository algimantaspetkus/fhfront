import { useState, useEffect } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import TaskList from "../components/Lists/TaskList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import CreateTaskForm from "../components/Forms/CreateTaskForm";
import TaskDetails from "../components/Details/TaskDetails";
import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useDrawer } from "../hooks/useDrawer";

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState(null);
  const { taskListId } = useParams();
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
    getTasks,
    setTaskData,
    createTask,
    toggleComplete,
    deleteTask,
  } = useTasks(taskListId);
  const { tasks, taskList } = state;

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  function showTaskDetailsHandler(taskId) {
    setSelectedTask(taskId);
    tdOpenDrawer();
  }

  function hideTaskDetailsHandler() {
    setSelectedTask(null);
    tdCloseDrawer();
  }

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            {taskList?.listTitle}
          </Typography>
          <TaskList
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            showTaskDetails={showTaskDetailsHandler}
          />
        </Box>
      </Container>
      <Drawer anchor={"right"} open={ctDrawerOpen} onClose={ctCloseDrawer}>
        <CreateTaskForm
          taskListId={taskListId}
          closeDrawer={ctCloseDrawer}
          setTaskData={setTaskData}
          createTask={createTask}
        />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={tdDrawerOpen}
        onClose={hideTaskDetailsHandler}
      >
        <TaskDetails taskId={selectedTask} />
      </Drawer>
      <SingleActionFab onClick={ctOpenDrawer} />
    </>
  );
}
