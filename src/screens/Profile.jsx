import { Box, Container, Typography, Button } from "@mui/material";
import UpdateAvatarForm from "../components/Forms/UpdateAvatarForm";

export default function Profile() {
  return (
    <Container>
      <Box sx={{ marginTop: "5rem" }}>
        <Typography variant="h4" component="h2">
          Profile Settings
        </Typography>
      </Box>
      <Box variant="form" sx={{ marginTop: "2rem" }}>
        <Typography variant="h6" component="h3">
          Change Profile Picture
        </Typography>
        <UpdateAvatarForm />
      </Box>
    </Container>
  );
}
