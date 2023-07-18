import { useReducer, useCallback, useEffect } from "react";
import io from "socket.io-client";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const initialState = {
  taskTitle: "",
  taskDescription: "",
  assignedToUser: "",
  dueBy: "",
  priority: "",
  tasks: [],
  taskList: {},
  loading: false,
  error: null,
  status: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TASK_TITLE":
      return {
        ...state,
        taskTitle: action.payload,
      };
    case "SET_TASK_DESCRIPTION":
      return {
        ...state,
        taskDescription: action.payload,
      };
    case "SET_ASSIGNED_TO_USER":
      return {
        ...state,
        assignedToUser: action.payload,
      };
    case "SET_DUE_BY":
      return {
        ...state,
        dueBy: action.payload,
      };
    case "SET_PRIORITY":
      return {
        ...state,
        priority: action.payload,
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}

export function useTasks(taskListId) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const server = process.env.REACT_APP_BASE_SERVER;

  const getTasks = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${server}/task/tasks/${taskListId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user task list");
      }
      const data = await response.json();
      dispatch({ type: "SET_TASKS", payload: data.tasks });
      dispatch({ type: "SET_STATUS", payload: "success" });
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [taskListId, server]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: taskListId },
    });

    socket.on("", () => {
      console.log("socket connected");
    });

    socket.on("taskItemAdded", () => {
      getTasks();
    });

    return () => {
      socket.disconnect();
    };
  }, [server, taskListId, getTasks]);

  const setTaskData = (type, payload) => {
    switch (type) {
      case "taskTitle":
        dispatch({ type: "SET_TASK_TITLE", payload: payload });
        break;
      case "taskDescription":
        dispatch({ type: "SET_TASK_DESCRIPTION", payload: payload });
        break;
      case "assignedToUser":
        dispatch({ type: "SET_ASSIGNED_TO_USER", payload: payload });
        break;
      case "dueBy":
        dispatch({ type: "SET_DUE_BY", payload: payload });
        break;
      case "priority":
        dispatch({ type: "SET_PRIORITY", payload: payload });
        break;
      default:
        break;
    }
  };

  const createTask = async (event) => {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const requestBody = {
        taskListId: taskListId,
        taskTitle: state.taskTitle !== "" ? state.taskTitle : undefined,
        taskDescription:
          state.taskDescription !== "" ? state.taskDescription : undefined,
        assignedToUser:
          state.assignedToUser !== "" ? state.assignedToUser : undefined,
        dueBy: state.dueBy !== "" ? state.dueBy : undefined,
        priority: state.priority !== "" ? state.priority : undefined,
      };

      const response = await fetch(`${server}/task/addtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        enqueueSnackbar("Failed to create task", {
          variant: "error",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        });
        throw new Error("Failed to create task");
      }
      enqueueSnackbar("Task created", {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        ),
      });
      await response.json();
      dispatch({ type: "SET_STATUS", payload: "success" });
      resetState();
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Failed to create task", {
        variant: "error",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        ),
      });
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const toggleComplete = async (taskId, payLoad) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const requestBody = {
        taskId: taskId,
        data: {
          completed: payLoad,
        },
      };
      fetch(`${server}/task/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(requestBody),
      });
      getTasks();
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteTask = async (taskId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      fetch(`${server}/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      getTasks();
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const getTask = async (taskId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetch(`${server}/task/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (data.status !== 200) {
        return null;
      }
      const task = await data.json();
      return task;
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const resetState = () => {
    dispatch({ type: "SET_TASK_TITLE", payload: "" });
    dispatch({ type: "SET_TASK_DESCRIPTION", payload: "" });
    dispatch({ type: "SET_ASSIGNED_TO_USER", payload: "" });
    dispatch({ type: "SET_DUE_BY", payload: "" });
    dispatch({ type: "SET_PRIORITY", payload: "" });
  };

  return {
    state,
    getTask,
    getTasks,
    setTaskData,
    createTask,
    toggleComplete,
    deleteTask,
  };
}
