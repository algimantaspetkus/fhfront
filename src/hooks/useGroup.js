import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultGroupId } from "../redux/userSettingsSlice";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";

export function useGroup() {
  const defaultGroup = useSelector(
    (state) => state.userSettings.defaultGroupId
  );
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const server = process.env.REACT_APP_BASE_SERVER;

  async function createGroup(event, ref) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/group/addgroup`, { name });
      if (response.status === 200) {
        enqueueSnackbar("Group created", {
          variant: "success",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        });
        ref.value = "";
        ref.focus();
        updateDefaultGroup(response.data.groupId);
      } else {
        enqueueSnackbar("Couldn't create group", {
          variant: "error",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Couldn't create group", {
        variant: "error",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        ),
      });
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
        enqueueSnackbar("Group disabled", { variant: "success" });
      } else {
        enqueueSnackbar("Couldn't disable group", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Couldn't disable group", { variant: "error" });
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
        enqueueSnackbar("Group left", { variant: "success" });
      } else {
        enqueueSnackbar("Couldn't leave group", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Couldn't leave group", { variant: "error" });
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
        enqueueSnackbar("Default group changed", { variant: "success" });
      } else {
        enqueueSnackbar("Couldn't change default group", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Couldn't change default group", { variant: "error" });
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
        enqueueSnackbar("Couldn't get group secret", { variant: "error" });
      }
      enqueueSnackbar("Invitation code copied to clipboard", {
        variant: "success",
      });
      navigator.clipboard.writeText(response.data.secret);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Couldn't get group secret", { variant: "error" });
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
        enqueueSnackbar("Group joined", { variant: "success" });
        ref.value = "";
        ref.focus();
      } else {
        enqueueSnackbar("Couldn't join group", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Couldn't join group", { variant: "error" });
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
