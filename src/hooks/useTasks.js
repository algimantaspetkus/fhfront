import { useReducer, useCallback, useEffect } from "react";
import io from "socket.io-client";
import { useSnackbarMessage } from "./useSnackbarMessage";
import api from "../api";

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
    case "SET_TASK_LIST":
      return {
        ...state,
        taskList: action.payload,
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
  const { sendMessage } = useSnackbarMessage();

  const server = process.env.REACT_APP_BASE_SERVER;

  const getTasks = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(`${server}/task/tasks/${taskListId}`);
      if (!response.data) {
        sendMessage("Failed to get tasks", "error");
      }
      const data = response.data;
      dispatch({ type: "SET_TASKS", payload: data.tasks });
      dispatch({ type: "SET_TASK_LIST", payload: data.taskList });
      dispatch({ type: "SET_STATUS", payload: "success" });
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get tasks",
        "error"
      );
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [taskListId, server, sendMessage]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: taskListId },
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

      const response = await api.post(`${server}/task/addtask`, requestBody);

      if (!response?.data) {
        sendMessage("Failed to create task", "error");
      }
      sendMessage("Task created", "success");
      dispatch({ type: "SET_STATUS", payload: "success" });
      resetState();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create task",
        "error"
      );
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
      await api.put(`${server}/task/update`, requestBody);
      getTasks();
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteTask = async (taskId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await api.delete(`${server}/task/${taskId}`);
      sendMessage("Task deleted", "success");
      getTasks();
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
      sendMessage(
        error?.response?.data?.error || "Failed to delete task",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const getTask = async (taskId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(`${server}/task/${taskId}`);
      if (!response.data) {
        return null;
      }
      return response.data;
    } catch (error) {
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
