import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";
import { useAuth } from "../../hooks/useAuth";
import PasswordInput from "../Inputs/PasswordInput";

export default function UpdatePasswordForm() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const signOutCallback = () => {
    signOut(() => navigate("/login"));
  };
  const { setPassword, changePassword } = useGetUser();
  return (
    <Box
      component="form"
      onSubmit={(event) => changePassword(event, signOutCallback)}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PasswordInput onChange={setPassword} label="Old password" />
        <PasswordInput onChange={setPassword} label="New password" />
        <PasswordInput onChange={setPassword} label="Confirm new password" />
      </Box>
      <Button sx={{ marginTop: "1rem" }} type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
