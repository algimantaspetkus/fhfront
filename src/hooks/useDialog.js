import { useState } from "react";

export function useDialog({ content, title, buttons }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleClickOpen() {
    setDialogOpen(true);
  }

  function handleClose() {
    setDialogOpen(false);
  }

  const dialogProps = {
    open: dialogOpen,
    closeHandler: handleClose,
    title,
    content,
    buttons,
  };

  return { dialogOpen, handleClickOpen, handleClose, dialogProps };
}
