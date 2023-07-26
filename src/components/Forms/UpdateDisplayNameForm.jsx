import { Box, Button, TextField } from "@mui/material";
import { useGetUser } from "../../hooks/useGetUser";

export default function UpdateDisplayName() {
  const { displayName, setDisplayName, updateDisplayName } = useGetUser();
  return (
    <Box component="form" onSubmit={updateDisplayName}>
      <TextField
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        label="Display Name"
        variant="outlined"
        size="small"
        fullWidth
        required
      />
      <Button
        disabled={displayName.length < 3}
        sx={{ marginTop: "1rem" }}
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
}
