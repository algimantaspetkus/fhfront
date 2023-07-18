import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useTasks } from "../../hooks/useTasks";
import io from "socket.io-client";

const server = process.env.REACT_APP_SERVER_URL;

export default function TaskDetails({ taskId }) {
  const [task, setTask] = useState(null);
  const { getTask } = useTasks();

  const fetchData = useCallback(
    async (id) => {
      const fetchedTask = await getTask(id);
      setTask(fetchedTask?.task);
    },
    [getTask]
  );

  useEffect(() => {
    if (taskId) {
      fetchData(taskId);
    }
  }, [taskId]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: taskId },
    });

    socket.on("taskItemUpdated", () => {
      fetchData();
    });

    return () => {
      socket.disconnect();
    };
  }, [taskId, fetchData]);

  console.log(task?.completed);

  return (
    <div>
      {task && (
        <>
          <h1>Task Details</h1>
          <div>{task.taskListId.listTitle}</div>
          <div>{task.taskTitle}</div>
          <div>{task.taskDescription}</div>
          <div>{task.priority}</div>
          <div>{task?.createdByUser?.displayName}</div>
          <div>{task?.assignedToUser?.displayName}</div>
          {task.completed && (
            <div>{dayjs(task.completedAt).format("YYYY-MM-DD HH:mm")}</div>
          )}
          <div>{dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}</div>
          <div>{dayjs(task.updatedAt).format("YYYY-MM-DD HH:mm")}</div>
          {task.dueBy && (
            <div>{dayjs(task.dueBy).format("YYYY-MM-DD HH:mm")} </div>
          )}
        </>
      )}
    </div>
  );
}
