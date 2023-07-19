import { Box } from "@mui/material";

const red = "#f44336";
const green = "#4caf50";
const yellow = "#ffeb3b";

function getColor(totalBars) {
  if (totalBars < 10) return green;
  if (totalBars < 20) return yellow;
  return red;
}

export default function PriorityBars({ priority }) {
  const totalBars = Math.floor(priority / 3.33);
  const bars = [...Array(totalBars)].map((_, i) => (
    <Bar key={i} color={getColor(totalBars)} height={`${i}`} />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        height: "30px",
        gap: "2px",
        alignItems: "flex-end",
      }}
    >
      {bars && bars}
    </Box>
  );
}

function Bar({ color, height }) {
  return (
    <Box
      sx={{ width: "6px", height: `${height}px`, backgroundColor: color }}
    ></Box>
  );
}
