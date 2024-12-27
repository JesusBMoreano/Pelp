import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import CuisineFilter from "../filter/CuisineFilter";
import FoodCategoryFilter from "../filter/FoodCategoryFilter";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import RatingFilter from "../filter/RatingFilter";
import PriceFilter from "../filter/PriceFilter";

const Form = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: searchParams.get("name") ?? "",
    cuisine: searchParams.get("cuisine") ?? "",
    zipCode: searchParams.get("zipCode") ?? "",
    foodCategory: searchParams.get("foodCategory") ?? "",
    price: searchParams.get("price") ?? "",
    rating: searchParams.get("rating") ?? "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, zipCode, cuisine, foodCategory, rating, price } = formData;

    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (zipCode) params.append("zipCode", zipCode);
    if (cuisine) params.append("cuisine", cuisine);
    if (foodCategory) params.append("foodCategory", foodCategory);
    if (rating) params.append("rating", rating);
    if (price) params.append("price", price);

    navigate(`/search?${params}`, { replace: true, key: new Date().getTime() });
  };

  return (
    <form onSubmit={handleSubmit} action="/search" id="form-search">
      <Stack direction="row" marginLeft={1} sx={{ mt: 2}}>
        <TextField
          id="searchbar_1"
          className="searchbar"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          label="Restaurant/Food/Type"
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ width: 200, 
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white', // Sets background color of the input area
            }
          }}
          color="white"
        />
        <TextField
          id="searchbar_2"
          value={formData.zipCode}
          className="searchbar"
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, zipCode: e.target.value };
            });
          }}
          label="Location"
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ 
            width: 200,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white'
            } 
          }}
          color="white"
        />

        <CuisineFilter formData={formData} setFormData={setFormData} />
        <FoodCategoryFilter formData={formData} setFormData={setFormData} />
        <RatingFilter formData={formData} setFormData={setFormData} />
        <PriceFilter formData={formData} setFormData={setFormData} />
      <IconButton
        type="submit"
        disableRipple
        disableFocusRipple
        aria-label="search"
        sx ={{
          marginLeft: 2, 
           
          backgroundColor: 'white', 
          borderRadius: 2, // Removes rounded corners to make it a box
          boxShadow: 'none', // Removes any shadow
          padding: '8px', // Adjust padding for a more defined box shape
          height: 1
          }}
      > 
        <SearchIcon id="search_icon" sx={{color: '#B22222'}}/>
      </IconButton>
      </Stack>
    </form>
  );
};

export default Form;
