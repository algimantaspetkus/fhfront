import { useState, useCallback } from "react";
import { Box, Typography, Container, Drawer } from "@mui/material";
import TaskListList from "../components/Lists/TaskListList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useTaskList } from "../hooks/useTaskList";

export default function TaskListPage() {
  const { taskLists } = useTaskList();
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
          <TaskListList {...taskListProps} />
        </Box>
      </Container>
      <SingleActionFab onClick={() => console.log("fab click")} />
      <Drawer
        anchor={"right"}
        open={false}
        onClose={() => console.log("close")}
        onOpen={() => console.log("open")}
      >
        <Box sx={{ width: "20rem" }}>Drawer</Box>
      </Drawer>
    </>
  );
}
