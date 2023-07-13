import { useState } from "react";

export function useDialog({ content, title, buttons }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const dialogProps = {
    open: dialogOpen,
    closeHandler: handleClose,
    title,
    content,
    buttons,
  };

  return { dialogOpen, handleClickOpen, handleClose, dialogProps };
}
