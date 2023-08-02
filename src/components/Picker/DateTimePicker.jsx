import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function DateTimePicker({ setDate, label }) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  useEffect(() => {
    setDate(selectedDateTime);
  }, [selectedDateTime, setDate]);

  function handleClearDateTime() {
    setSelectedDateTime(null);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <MobileDateTimePicker
          sx={{ flex: 1 }}
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          format="YYYY-MM-DD HH:mm"
          ampm={false}
          label={label}
        />
        <IconButton onClick={handleClearDateTime}>
          <ClearIcon />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
}
