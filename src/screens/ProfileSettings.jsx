import { Box, Container, Typography } from "@mui/material";

import UpdateAvatarForm from "../components/Forms/UpdateAvatarForm";
import UpdateDisplayNameForm from "../components/Forms/UpdateDisplayNameForm";
import UpdatePasswordForm from "../components/Forms/UpdatePasswordForm";

export default function Profile() {
  return (
    <Container>
      <Box sx={{ marginTop: "5rem" }}>
        <Typography variant="h4" component="h2">
          Profile Settings
        </Typography>
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Change Profile Picture
        </Typography>
        <UpdateAvatarForm />
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Change Display Name
        </Typography>
        <UpdateDisplayNameForm />
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Change Password
        </Typography>
        <UpdatePasswordForm />
      </Box>
    </Container>
  );
}
