import * as React from "react";
import { Box, Typography, Modal, Chip } from "@mui/material";

const shoppingItemCategories = [
  "Food",
  "Drinks",
  "Alcohol",
  "Household Chemicals",
  "Vegetables",
  "Fruit",
  "Dairy Products",
  "Baked Goods",
  "Snacks",
  "Meat and Poultry",
  "Seafood",
  "Frozen Foods",
  "Canned Goods",
  "Condiments and Sauces",
  "Grains and Pasta",
  "Breakfast Foods",
  "Personal Care Products",
  "Cleaning Supplies",
  "Pet Supplies",
  "Health and Wellness Products",
];

export default function ChipModal({
  open,
  closeModal,
  chipClickHandler,
  chipDeleteHandler,
}) {
  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Text in a modal
        </Typography>
        <Box>
          {shoppingItemCategories
            .sort((a, b) => a.localeCompare(b))
            .map((category) => (
              <Chip
                sx={{ margin: "0.5rem" }}
                key={category}
                label={category}
                color="primary"
                onClick={() => chipClickHandler(category)}
              />
            ))}
        </Box>
        <Chip
          label="Delete"
          sx={{ margin: "0.5rem", width: "100%" }}
          color="error"
          onClick={chipDeleteHandler}
        />
      </Box>
    </Modal>
  );
}
