import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  resetState,
  setUserId,
  setDisplayName,
  setAvatar,
  setDefaultGroupId,
} from "../redux/userSettingsSlice";
import { incrementKey } from "../redux/navigationSlice";
import { useSnackbarMessage } from "./useSnackbarMessage";
import api from "../api";

export function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [fileName, setFileName] = useState("");
  const { sendMessage } = useSnackbarMessage();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  async function getUser() {
    setLoading(true);
    try {
      const response = await api.get(`${server}/user/check`);
      const data = response.data;
      if (data.error) {
        sendMessage(data.error, "error");
      }
      if (!data.error) {
        dispatch(setUserId(data._id));
        dispatch(setDisplayName(data.displayName));
        dispatch(setAvatar(data.avatar));
        dispatch(setDefaultGroupId(data.defaultGroupId));
        dispatch(incrementKey());
        if (!data.defaultGroupId && window.location.pathname !== "/group") {
          window.location.href = "/group";
        }
      } else {
        localStorage.removeItem("token");
        dispatch(resetState());
        window.location.href = "/login";
      }
    } catch (error) {
      sendMessage("Error getting user", "error");
    } finally {
      setLoading(false);
    }
  }

  async function updateAvatar(event) {
    event.preventDefault();
    if (showClearButton) {
      const formData = new FormData();
      formData.append("avatar", fileInputRef.current.files[0]);
      api
        .put("/user/updateavatar", formData)
        .then((response) => {
          getUser();
        })
        .catch((error) => {
          console.error("File upload error:", error);
        });

      setFileName("");
      setShowClearButton(false);
      fileInputRef.current.value = null;
    }
  }

  return {
    loading,
    fileInputRef,
    showClearButton,
    fileName,
    setFileName,
    setShowClearButton,
    getUser,
    updateAvatar,
  };
}
