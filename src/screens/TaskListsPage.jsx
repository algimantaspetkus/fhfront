import { useState, useCallback } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import TaskListList from "../components/Lists/TaskListList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useTaskList } from "../hooks/useTaskList";
import { useDrawer } from "../hooks/useDrawer";
import CreateTaskListForm from "../components/Forms/CreateTaskListForm";

export default function TaskListPage() {
  const { taskLists, setTaskListData, createTaskList } = useTaskList();
  const [activeTaskListId, setActiveTaskListId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { openDrawer, closeDrawer, drawerOpen } = useDrawer();

  const handleClick = useCallback((event, taskListId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveTaskListId(taskListId);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const taskListProps = {
    taskLists,
    handleClick,
    anchorEl,
    handleClose,
    activeTaskListId,
  };

  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            TaskList page
          </Typography>
          <TaskListList {...taskListProps} />
        </Box>
      </Container>
      <SingleActionFab onClick={openDrawer} />
      <Drawer anchor={"right"} open={drawerOpen} onClose={closeDrawer}>
        <CreateTaskListForm
          closeDrawer={closeDrawer}
          setTaskListData={setTaskListData}
          createTaskList={createTaskList}
        />
      </Drawer>
    </>
  );
}
