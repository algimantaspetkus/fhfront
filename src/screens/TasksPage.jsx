import { useState, useEffect } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import TaskItemsList from "../components/Lists/TaskItemsList";
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
  const { itemListId } = useParams();

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
    setTaskData,
    createTask,
    toggleComplete,
    deleteTask,
  } = useTasks(itemListId);
  const { tasks, taskList } = state;

  const { dialogProps: dialogPropsTask, handleClickOpen: handleClickOpenTask } =
    useDialog({
      content:
        "Are you sure you want to delete this task? This action cannot be undone.",
      title: "Delete Task",
      buttons: [
        { title: "Cancel" },
        {
          autofocus: true,
          title: "Delete",
          callback: () => {
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
          <TaskItemsList
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            showTaskDetails={showTaskDetailsHandler}
          />
        </Box>
      </Container>
      <Drawer anchor={"right"} open={ctDrawerOpen} onClose={ctCloseDrawer}>
        <CreateTaskForm
          itemListId={itemListId}
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
          deleteTask={handleClickOpenTask}
          key={key}
        />
      </Drawer>
      {dialogPropsTask.open && <Dialog dialogProps={dialogPropsTask} />}
      <SingleActionFab onClick={ctOpenDrawer} />
    </>
  );
}
