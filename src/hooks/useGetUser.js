import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetState,
  setUserId,
  setDisplayName,
  setAvatar,
  setDefaultGroupId,
} from "../redux/userSettingsSlice";
import api from "../api";

export function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();

  const server = process.env.REACT_APP_BASE_SERVER;

  async function getUser() {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.get(`${server}/user/check`);
      const data = response.data;
      if (data.error) {
        setError(data.error);
        setStatus("error");
      }
      if (!data.error) {
        dispatch(setUserId(data._id));
        dispatch(setDisplayName(data.displayName));
        dispatch(setAvatar(data.avatar));
        dispatch(setDefaultGroupId(data.defaultGroupId));
        setStatus("success");
        if (!data.defaultGroupId && window.location.pathname !== "/group") {
          window.location.href = "/group";
        }
      } else {
        localStorage.removeItem("token");
        dispatch(resetState());
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Authentication error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return { loading, status, error, getUser };
}
