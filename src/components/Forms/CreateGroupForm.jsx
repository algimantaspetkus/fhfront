import { useRef } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import { useGroup } from "../../hooks/useGroup";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateGroupForm({ drawerClose }) {
  const { createGroup, setGroupNameHandler, joinGroup, setGroupSecretHandler } =
    useGroup();
  const name = useRef(null);
  const secret = useRef(null);

  return (
    <Container sx={{ padding: "2rem" }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          Create a Group
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", gap: "1rem" }}
          onSubmit={(event) => {
            createGroup(event, name.current?.querySelector("input"));
            drawerClose();
          }}
        >
          <TextField
            ref={name}
            label="Group Name"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setGroupNameHandler(e)}
            required
          />
          <LoadingButton
            // disabled={loading || !email || !password}
            type="submit"
            // loading={loading}
            variant="outlined"
          >
            Create
          </LoadingButton>
        </Box>
      </Box>

      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          Join a Group
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", gap: "1rem" }}
          onSubmit={(event) => {
            joinGroup(event, secret.current?.querySelector("input"));
            drawerClose();
          }}
        >
          <TextField
            ref={secret}
            label="Invitation Code"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setGroupSecretHandler(e)}
            required
          />
          <LoadingButton
            // disabled={loading || !email || !password}
            type="submit"
            // loading={loading}
            variant="outlined"
          >
            Join
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
