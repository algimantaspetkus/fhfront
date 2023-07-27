import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function SpeedDialFab({
  addItem,
  filterCompleted,
  toggleFilterCompleted,
}) {
  return (
    <Box sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<SpeedDialIcon />}
        direction="left"
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Add Item"
          onClick={addItem}
        />

        {filterCompleted ? (
          <SpeedDialAction
            icon={<FilterAltOffIcon />}
            tooltipTitle="Show All"
            onClick={toggleFilterCompleted}
          />
        ) : (
          <SpeedDialAction
            icon={<FilterAltIcon />}
            tooltipTitle="Hide Completed"
            onClick={toggleFilterCompleted}
          />
        )}
      </SpeedDial>
    </Box>
  );
}
