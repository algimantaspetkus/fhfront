import * as React from "react";
import Button from "@mui/material/Button";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function SimpleDialog({ dialogProps }) {
  const { open, closeHandler, title, content, buttons } = dialogProps;
  return (
    <div>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="p">{content}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons.map(({ callback, title, autofocus }) => (
            <Button
              {...autofocus}
              onClick={() => {
                callback && callback();
                closeHandler();
              }}
              key={title}
            >
              {title}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
