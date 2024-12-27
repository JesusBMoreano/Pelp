import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Typography, Link } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import ImageSlideshow from "./imageSlideshow/ImageSlideshow";
//import { Link } from "react-router-dom";

const SearchResult = (props) => {
  const {
    id,
    restaurantName,
    ratingNumber,
    ratingValue,
    cuisineValue,
    dollarValue,
    locationValue,
    closingTime,
    openTime,
    isClosed,
    foodCategoryValue,
    photos,
    reviews
  } = props;

  const totalRating = reviews.reduce((sum, entry) => sum + entry.rating, 0);
  const averageRating = totalRating / reviews.length;
  console.log(reviews.length)
  const dollarCountString = "$".repeat(dollarValue);
  return (
    <Box
      sx={{
        minWidth: "60%",
        ":hover": {
          boxShadow: "10px 10px 10px rgba(36, 36, 36, 0.5)",
        },
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row" spacing={4}>
            <ImageSlideshow slides={photos} />
            <Stack spacing={1}>
              <Link
                // color="inherit"
                href={`/restaurantpage/${id}`}
                // sx={{
                //   textDecoration: "none",
                //   ":hover": {
                //     textDecoration: "underline",
                //     cursor: "pointer",
                //   },
                // }}
              >
                <Typography variant="h5">{restaurantName}</Typography>
              </Link>
              <Stack direction="row" spacing={1}>
                <Rating
                  name="restaurant-rating"
                  value={averageRating}
                  precision={0.5}
                  readOnly
                />
                <Typography fontWeight="bold">({reviews.length})</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                {cuisineValue?.map((cuisine) => (
                  <Chip
                    key={cuisine.id}
                    label={cuisine.name}
                    size="small"
                    color="primary"
                  />
                ))}
                {foodCategoryValue?.map((foodCategory) => (
                  <Chip
                    key={foodCategory.id}
                    label={foodCategory.name}
                    size="small"
                    color="secondary"
                  />
                ))}
                <Typography fontWeight="bold">•</Typography>
                <Typography>{dollarCountString}</Typography>
                <Typography fontWeight="bold">•</Typography>
                <Typography>{locationValue}</Typography>
              </Stack>
              {isClosed ? (
                <Typography color="error">Closed till {openTime}</Typography>
              ) : (
                <Typography color="success">Open till {closingTime}</Typography>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchResult;
