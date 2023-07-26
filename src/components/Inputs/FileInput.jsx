import { Button, InputAdornment, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function FileInput({
  fileInputRef,
  handleFileInputChange,
  fileName,
  showClearButton,
  handleUploadButtonClick,
}) {
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept="image/jpeg, image/png, image/gif"
      />
      <TextField
        value={fileName}
        label="Select an image"
        variant="outlined"
        size="small"
        fullWidth
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                component="span"
                onClick={handleUploadButtonClick}
                startIcon={
                  showClearButton ? <ClearIcon /> : <CloudUploadIcon />
                }
              >
                {showClearButton ? "Cancel" : "Upload"}
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
