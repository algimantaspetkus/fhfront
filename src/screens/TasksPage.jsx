import { useState, useEffect } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import TaskList from "../components/Lists/TaskList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import CreateTaskForm from "../components/Forms/CreateTaskForm";
import TaskDetails from "../components/Details/TaskDetails";
import Dialog from "../components/Dialog/Dialog";
import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useDrawer } from "../hooks/useDrawer";
import { useDialog } from "../hooks/useDialog";
import { useDispatch } from "react-redux";
import { setTitle } from "../redux/navigationSlice";

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
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
    getTask,
    getTasks,
    setTaskData,
    createTask,
    toggleComplete,
    deleteTask,
  } = useTasks(taskListId);
  const { tasks, taskList } = state;

  const { dialogProps, handleClickOpen } = useDialog({
    content:
      "Are you sure you want to delete this task? This action cannot be undone.",
    title: "Delete Group",
    buttons: [
      { title: "Cancel" },
      {
        autofocus: true,
        title: "Delete",
        callback: () => {
          console.log(selectedTask);
          deleteTask(selectedTask);
          tdCloseDrawer();
        },
      },
    ],
  });

  useEffect(() => {
    dispatch(setTitle(taskList?.listTitle));
  }, [dispatch, taskList]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [tasks]);

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
        <TaskDetails
          taskId={selectedTask}
          getTask={getTask}
          toggleComplete={toggleComplete}
          deleteTask={handleClickOpen}
          key={key}
        />
      </Drawer>
      {dialogProps.open && <Dialog dialogProps={dialogProps} />}
      <SingleActionFab onClick={ctOpenDrawer} />
    </>
  );
}
