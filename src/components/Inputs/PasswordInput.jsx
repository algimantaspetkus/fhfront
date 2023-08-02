import { useState } from "react";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordInput({
  label,
  onChange,
  passwordRef,
  fullWidth,
}) {
  const [showPassword, setShowPassword] = useState(false);
  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }
  function handleMouseDownPassword(event) {
    event.preventDefault();
  }
  return (
    <FormControl
      fullWidth={fullWidth}
      variant="outlined"
      onChange={(e) => onChange(label, e.target.value)}
    >
      <InputLabel htmlFor={label.replace(" ", "-")}>{label}</InputLabel>
      <OutlinedInput
        ref={passwordRef}
        id={label.replace(" ", "-")}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}
