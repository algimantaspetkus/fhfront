import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faGift,
  faStethoscope,
  faCompass,
  faGraduationCap,
  faChampagneGlasses,
  faPaw,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const iconNarray = [
  {
    icon: faCakeCandles,
    text: "birthday",
  },
  {
    icon: faGift,
    text: "gift",
  },
  {
    icon: faStethoscope,
    text: "medical",
  },
  {
    icon: faCompass,
    text: "travel",
  },
  {
    icon: faGraduationCap,
    text: "graduation",
  },
  {
    icon: faChampagneGlasses,
    text: "party",
  },
  {
    icon: faPaw,
    text: "pet",
  },
  {
    icon: faUtensils,
    text: "food",
  },
];

export default function FAIconPicker({ selectedIcon, iconClickHandler }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {iconNarray.map((icon, index) => (
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
