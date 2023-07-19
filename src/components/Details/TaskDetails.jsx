import { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import PriorityBars from "../UI/PriorityBars";
import dayjs from "dayjs";
import { useTasks } from "../../hooks/useTasks";

export default function TaskDetails({ taskId }) {
  const [task, setTask] = useState(null);
  const { getTask } = useTasks();

  const fetchData = useCallback(
    async (id) => {
      const fetchedTask = await getTask(id);
      console.log(fetchedTask);
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

  return (
    <Container sx={{ padding: "2rem" }}>
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
              readonly
            />
            {task.priority > 0 && <PriorityBars priority={task.priority} />}
            <TextField label="Task Priority" value={task.priority} readonly />
            <TextField
              label="Created By"
              value={task?.createdByUser?.displayName}
              readonly
            />
            <TextField
              label="Created At"
              value={dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}
              readonly
            />
            {task.assignedToUser && (
              <TextField
                label="Assigned To"
                value={task?.assignedToUser?.displayName}
                readonly
              />
            )}
            {task.completed && (
              <TextField
                label="Completed At"
                value={dayjs(task.completedAt).format("YYYY-MM-DD HH:mm")}
                readonly
              />
            )}
            {task.dueBy && (
              <TextField
                label="Due By"
                value={dayjs(task.dueBy).format("YYYY-MM-DD HH:mm")}
                readonly
              />
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}
