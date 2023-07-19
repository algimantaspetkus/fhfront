import { useState } from "react";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";

export function useFamily() {
  const [defaultFamily, setDefaultFamily] = useState(
    localStorage.getItem("defaultFamilyId")
  );
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const server = process.env.REACT_APP_BASE_SERVER;

  async function createFamily(event, ref) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/family/addfamily`, { name });
      if (response.status === 200) {
        enqueueSnackbar("Family created", {
          variant: "success",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        });
        ref.value = "";
        ref.focus();
      } else {
        console.log(response.status);
        enqueueSnackbar("Couldn't create family", {
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
      enqueueSnackbar("Couldn't create family", {
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

  async function disableFamily(familyId) {
    setLoading(true);
    try {
      const response = await api.post(`${server}/family/disablefamily`, {
        familyId,
      });
      if (response.status === 200) {
        enqueueSnackbar("Family disabled", { variant: "success" });
      } else {
        console.log(response.status);
        enqueueSnackbar("Couldn't disable family", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Couldn't disable family", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function leaveFamily(familyId) {
    setLoading(true);
    try {
      const response = await api.post(`${server}/family/leavefamily`, {
        familyId,
      });
      if (response.status === 200) {
        enqueueSnackbar("Family left", { variant: "success" });
      } else {
        console.log(response.status);
        enqueueSnackbar("Couldn't leave family", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Couldn't leave family", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function updateDefaultFamily(id) {
    setLoading(true);
    try {
      const response = await api.put(`${server}/user/updatedefaultfamily`, {
        defaultFamilyId: id,
      });
      if (response.status === 200) {
        localStorage.setItem("defaultFamilyId", id);
        setDefaultFamily(id);
        enqueueSnackbar("Default family changed", { variant: "success" });
      } else {
        enqueueSnackbar("Couldn't change default family", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Couldn't change default family", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function getFamilySecret(familyId) {
    setLoading(true);
    try {
      const response = await api.get(
        `${server}/family/getfamilysecret/${familyId}`
      );
      if (!response?.data?.secret) {
        enqueueSnackbar("Couldn't get family secret", { variant: "error" });
      }
      enqueueSnackbar("Invitation code copied to clipboard", {
        variant: "success",
      });
      navigator.clipboard.writeText(response.data.secret);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Couldn't get family secret", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function joinFamily(event, ref) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/family/joinfamily`, {
        secret,
      });
      if (response.status === 200) {
        enqueueSnackbar("Family joined", { variant: "success" });
        ref.value = "";
        ref.focus();
      } else {
        enqueueSnackbar("Couldn't join family", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Couldn't join family", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  const setFamilyNameHandler = (event) => {
    setName(event.target.value);
  };

  const setFamilySecretHandler = (event) => {
    setSecret(event.target.value);
  };

  return {
    createFamily,
    disableFamily,
    leaveFamily,
    setFamilyNameHandler,
    setFamilySecretHandler,
    updateDefaultFamily,
    getFamilySecret,
    joinFamily,
    loading,
    defaultFamily,
  };
}
