import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const useSnackbarMessage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function sendMessage(message, variant) {
    enqueueSnackbar(message, {
      variant,
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <CloseIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      ),
    });
  }

  return { sendMessage };
};
