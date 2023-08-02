import { Box } from "@mui/material";

const red = "#f44336";
const green = "#4caf50";
const yellow = "#ffeb3b";

function getColor(totalBars) {
  if (totalBars < 10) return green;
  if (totalBars < 20) return yellow;
  return red;
}

export function PriorityBars({ priority }) {
  const totalBars = Math.max(Math.ceil(priority / 3.33), 1);
  let bars = [...Array(totalBars)].map((_, i) => (
    <Bar key={i} color={getColor(totalBars)} height={`${i + 1}px`} />
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

export function PriorityBarsMinified({ priority }) {
  const totalBars = Math.max(Math.ceil(priority / 10), 1);
  const color = Math.floor(priority / 3.33);
  let bars = [...Array(totalBars)].map((_, i) => (
    <Bar key={i} color={getColor(color)} height={`${i + 1}px`} />
  ));
  if (priority === 0) bars = null;

  return (
    <Box
      sx={{
        display: "flex",
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
    <Box sx={{ width: "6px", height: height, backgroundColor: color }}></Box>
  );
}
