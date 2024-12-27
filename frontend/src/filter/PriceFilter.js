import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Box, MenuItem, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
const marks = [
  {
    value: 1,
    label: "$",
  },
  {
    value: 2,
    label: "$$",
  },
  {
    value: 3,
    label: "$$$",
  },
  {
    value: 4,
    label: "$$$$",
  },
  {
    value: 5,
    label: "$$$$$",
  },
];

const PriceFilter = ({ formData, setFormData }) => {
  const handlePriceChange = (event) => {
    setFormData((prev) => {
      return { ...prev, price: event.target.value };
    });
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        defaultValue={formData.price ?? 1}
        step={1}
        marks={marks}
        min={1}
        max={5}
        onChange={handlePriceChange}
        sx={{
          '& .MuiSlider-track': {
            backgroundColor: 'black', // Sets the track to white
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'white', // Optional: makes the rail color lighter for contrast
          },
          '& .MuiSlider-thumb': {
            color: 'black', // Sets the thumb (dot) color to black
          },
          '& .MuiSlider-markLabel': {
            color: 'black', // Makes the labels black
          },
          marginLeft: 1,
          width: 175
          }}
      />
    </Box>
  );
};

export default PriceFilter;
