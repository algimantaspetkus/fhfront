import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultGroupId } from "../redux/userSettingsSlice";
import { useSnackbarMessage } from "./useSnackbarMessage";
import api from "../api";

export function useGroup() {
  const { sendMessage } = useSnackbarMessage();
  const defaultGroup = useSelector(
    (state) => state.userSettings.defaultGroupId
  );
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const server = process.env.REACT_APP_BASE_SERVER;

  async function createGroup(event, ref) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/group/addgroup`, { name });
      if (response.status === 200) {
        sendMessage("Group created", "success");
        ref.value = "";
        ref.focus();
        updateDefaultGroup(response.data.groupId);
      } else {
        sendMessage("Failed to create a group", "error");
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create a group",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function disableGroup(groupId) {
    setLoading(true);
    try {
      const response = await api.post(`${server}/group/disablegroup`, {
        groupId,
      });
      if (response.status === 200) {
        sendMessage("Group delete", "success");
      } else {
        sendMessage("Failed to delete group", "error");
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to delete group",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function leaveGroup(groupId) {
    setLoading(true);
    try {
      const response = await api.post(`${server}/group/leavegroup`, {
        groupId,
      });
      if (response.status === 200) {
        sendMessage("Group left", "success");
      } else {
        sendMessage("Failed to leave group", "error");
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to leave group",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateDefaultGroup(id) {
    setLoading(true);
    try {
      const response = await api.put(`${server}/user/updatedefaultgroup`, {
        defaultGroupId: id,
      });
      if (response.status === 200) {
        dispatch(setDefaultGroupId(id));
        sendMessage("Default group changed", "success");
      } else {
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to change default group",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function getGroupSecret(groupId) {
    setLoading(true);
    try {
      const response = await api.get(
        `${server}/group/getgroupsecret/${groupId}`
      );
      if (!response?.data?.secret) {
        sendMessage("Failed to get invitation code", "error");
      }
      sendMessage("Invitation code copied to clipboard", "success");
      navigator.clipboard.writeText(response.data.secret);
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get invitation code",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function joinGroup(event, ref) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/group/joingroup`, {
        secret,
      });
      if (response.status === 200) {
        sendMessage("Group joined", "success");
        ref.value = "";
        ref.focus();
      } else {
        sendMessage("Failed to join group", "error");
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to join group",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  const setGroupNameHandler = (event) => {
    setName(event.target.value);
  };

  const setGroupSecretHandler = (event) => {
    setSecret(event.target.value);
  };

  return {
    createGroup,
    disableGroup,
    leaveGroup,
    setGroupNameHandler,
    setGroupSecretHandler,
    updateDefaultGroup,
    getGroupSecret,
    joinGroup,
    loading,
    defaultGroup,
  };
}
