import { useGetUser } from "../../hooks/useGetUser";
import { Button, Box } from "@mui/material";
import FileInput from "../Inputs/FileInput";

export default function UpdateAvatarForm() {
  const {
    updateAvatar,
    fileInputRef,
    showClearButton,
    fileName,
    setFileName,
    setShowClearButton,
  } = useGetUser();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (allowedFormats.includes(file.type)) {
        setFileName(file.name);
        setShowClearButton(true);
      } else {
        alert("Please select a valid image format (JPEG, PNG, or GIF).");
        setFileName("");
      }
    }
  };

  const handleUploadButtonClick = () => {
    if (showClearButton) {
      setFileName("");
      setShowClearButton(false);
      fileInputRef.current.value = null;
    } else {
      fileInputRef.current.click();
    }
  };

  return (
    <Box component="form" onSubmit={updateAvatar}>
      <FileInput
        fileInputRef={fileInputRef}
        handleFileInputChange={handleFileInputChange}
        fileName={fileName}
        showClearButton={showClearButton}
        handleUploadButtonClick={handleUploadButtonClick}
      />
      <Button
        sx={{ marginTop: "1rem" }}
        type="submit"
        variant="contained"
        disabled={!showClearButton}
      >
        Submit
      </Button>
    </Box>
  );
}
