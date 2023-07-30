import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEvent } from "../../hooks/useEvent";

export default function FAIconPicker({ selectedIcon, iconClickHandler }) {
  const { iconArray } = useEvent();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {iconArray.map((icon, index) => (
        <IconButton
          key={index}
          color={icon.text === selectedIcon ? "primary" : ""}
          sx={{
            margin: "0.5rem",
            width: "40px",
            height: "40px",
          }}
          onClick={() => iconClickHandler(icon.text)}
        >
          <FontAwesomeIcon icon={icon.icon} />
        </IconButton>
      ))}
    </Box>
  );
}
