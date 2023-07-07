import { useRef } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import { useFamilyControl } from "../../hooks/useFamilyControl";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CreateFamilyForm({ drawerClose }) {
  const {
    createFamily,
    setFamilyNameHandler,
    joinFamily,
    setFamilySecretHandler,
  } = useFamilyControl();
  const name = useRef(null);
  const secret = useRef(null);

  return (
    <Container sx={{ padding: "2rem" }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography sx={{ marginBottom: "1rem" }} variant="h5">
          Create a Family
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", gap: "1rem" }}
          onSubmit={(event) => {
            createFamily(event, name.current?.querySelector("input"));
            drawerClose();
          }}
        >
          <TextField
            ref={name}
            label="Family Name"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setFamilyNameHandler(e)}
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
          Join a Family
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", gap: "1rem" }}
          onSubmit={(event) => {
            joinFamily(event, secret.current?.querySelector("input"));
            drawerClose();
          }}
        >
          <TextField
            ref={secret}
            label="Invitation Code"
            variant="outlined"
            sx={{ flex: 1 }}
            onChange={(e) => setFamilySecretHandler(e)}
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
