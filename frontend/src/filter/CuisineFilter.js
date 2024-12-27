import { Box, CircularProgress, TextField, InputLabel } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import MenuItem from "@mui/material/MenuItem";

const CuisineFilter = ({ formData, setFormData }) => {
  const handleCuisineFilterChange = (event) => {
    setFormData((prev) => {
      return { ...prev, cuisine: event.target.value };
    });
  };
  const fetchCuisines = () => fetch("/cuisine").then((res) => res.json());
  const { isPending, error, data } = useQuery({
    queryKey: ["cuisine"],
    queryFn: () => fetchCuisines(),
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
        className="searchbar"
        id="cuisine-filter"
        label="Cuisine"
        value={formData?.cuisine ?? "Cuisine"}
        onChange={handleCuisineFilterChange}
        size="small"
        sx={{ 
          width: 200,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white', // Sets background color of the input area
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

export default CuisineFilter;
