import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Box, MenuItem, TextField } from "@mui/material";
const FoodCategoryFilter = ({ formData, setFormData }) => {
  const handleFoodCategoryChange = (event) => {
    setFormData((prev) => {
      return { ...prev, foodCategory: event.target.value };
    });
  };

  const fetchFoodCategories = () =>
    fetch("/foodCategory").then((res) => res.json());
  const { isPending, error, data } = useQuery({
    queryKey: ["foodCategory"],
    queryFn: () => fetchFoodCategories(),
    keepPreviousData: true,
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        select
        id="food-category-filter"
        label="Food Category"
        className="searchbar"
        value={formData?.foodCategory ?? "Food Category"}
        onChange={handleFoodCategoryChange}
        size="small"
        sx={{ 
          width: 200,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          } 
        }}
      >
        {data?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default FoodCategoryFilter;
