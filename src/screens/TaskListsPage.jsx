import { useState, useCallback } from "react";
import { Box, Typography, Container, SwipeableDrawer } from "@mui/material";
import TaskList from "../components/Lists/TaskList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useTaskControl } from "../hooks/useTaskControl";

export default function TaskListPage() {
  const { loading, status, error, getTaskList, taskLists } = useTaskControl();
  const [activeTaskListId, setActiveTaskListId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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
          <TaskList {...taskListProps} />
        </Box>
      </Container>
      <SingleActionFab onClick={() => console.log("fab click")} />
      <SwipeableDrawer
        anchor={"right"}
        open={false}
        onClose={() => console.log("close")}
        onOpen={() => console.log("open")}
      >
        <Box sx={{ width: "20rem" }}>Drawer</Box>
      </SwipeableDrawer>
    </>
  );
}
