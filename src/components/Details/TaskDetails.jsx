import { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import PriorityBars from "../UI/PriorityBars";
import dayjs from "dayjs";
import { DrawerSkeleton } from "../DrawerSkeleton";
import { useTasks } from "../../hooks/useTasks";

export default function TaskDetails({ taskId }) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const { getTask } = useTasks();

  const fetchData = useCallback(
    async (id) => {
      const fetchedTask = await getTask(id);
      setLoading(false);
      setTask(fetchedTask?.task);
    },
    [getTask]
  );

  useEffect(() => {
    if (taskId) {
      fetchData(taskId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  console.log(loading);

  return (
    <Container sx={{ padding: "2rem" }}>
      {loading ? (
        <DrawerSkeleton />
      ) : (
        <Box sx={{ marginBottom: "3rem" }}>
          {task && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Typography sx={{ marginBottom: "1rem" }} variant="h5">
                {task.taskTitle}
              </Typography>
              <TextField
                label="Task Description"
                value={task.taskDescription}
                multiline
                rows={4}
                readOnly
              />
              {task.priority > 0 && <PriorityBars priority={task.priority} />}
              <TextField label="Task Priority" value={task.priority} readOnly />
              <TextField
                label="Created By"
                value={task?.createdByUser?.displayName}
                readOnly
              />
              <TextField
                label="Created At"
                value={dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}
                readOnly
              />
              {task.assignedToUser && (
                <TextField
                  label="Assigned To"
                  value={task?.assignedToUser?.displayName}
                  readOnly
                />
              )}
              {task.completed && (
                <TextField
                  label="Completed At"
                  value={dayjs(task.completedAt).format("YYYY-MM-DD HH:mm")}
                  readOnly
                />
              )}
              {task.dueBy && (
                <TextField
                  label="Due By"
                  value={dayjs(task.dueBy).format("YYYY-MM-DD HH:mm")}
                  readOnly
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}
