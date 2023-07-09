import { useState, useCallback, useEffect } from "react";
import { Box, Typography, Container, SwipeableDrawer } from "@mui/material";
import TaskList from "../components/Lists/TaskList";
import SingleActionFab from "../components/Fab/SingleActionFab";
import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function TasksPage() {
  const { taskListId } = useParams();
  const { tasks, taskList, loading, status, error, getTasks } =
    useTasks(taskListId);

  const taskListProps = {
    tasks,
  };

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
          <TaskList {...taskListProps} />
        </Box>
      </Container>
    </>
  );
}
