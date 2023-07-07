import { Fab } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

export default function SingleActionFab({ onClick }) {
  return (
    <Fab
      onClick={onClick}
      color="primary"
      sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
    >
      <SpeedDialIcon />
    </Fab>
  );
}
