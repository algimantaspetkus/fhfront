import { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { PriorityBars } from "./PriorityBars";
import dayjs from "dayjs";
import { DrawerSkeleton } from "../FeedBack/Skeleton";

export default function TaskDetails({
  itemId,
  deleteItem,
  getItem,
  toggleComplete,
}) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  const fetchData = useCallback(
    async (id) => {
      const fetchedTask = await getItem(id);
      setLoading(false);
      setTask(fetchedTask?.task);
    },
    [getItem]
  );

  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <Container sx={{ padding: "2rem" }}>
      {loading ? (
        <DrawerSkeleton />
      ) : (
        <Box sx={{ marginBottom: "3rem" }}>
          {task && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Typography sx={{ marginBottom: "1rem" }} variant="h5">
                {task.taskTitle}
              </Typography>
              {task.taskDescription && (
                <TextField
                  label="Task Description"
                  value={task.taskDescription}
                  multiline
                  rows={4}
                  readOnly
                />
              )}
              {task.priority > 0 && <PriorityBars priority={task.priority} />}
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="text"
                  onClick={() => toggleComplete(task._id, !task.completed)}
                >
                  {task.completed ? "Un-Complete" : "Complete"}
                </Button>
                <Button variant="text" color="error" onClick={deleteItem}>
                  Delete
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}
