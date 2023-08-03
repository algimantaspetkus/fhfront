import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback } from "react";

export function useSnackbarMessage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const userId = useSelector((state) => state.userSettings.userId);

  const sendMessage = useCallback(
    (message, variant, isAuthMessage) => {
      const path = window.location.pathname;
      if (
        !userId &&
        !isAuthMessage &&
        (path !== "/signin" || path !== "/signuo")
      ) {
        return;
      }
      enqueueSnackbar(message, {
        variant,
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar, userId]
  );

  return { sendMessage };
}
