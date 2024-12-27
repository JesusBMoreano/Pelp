import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  IconButton,
  Grid,
  CssBaseline,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useParams } from "react-router-dom";
import { fetchRestaurantDetails as fetchMockRestaurantDetails } from "./api-mock"; // Mock API
import { fetchRestaurantDetails as fetchRealRestaurantDetails } from "./restaurantpage-api"; // Real API
import NavBar from "../components/NavBar";
import ImageSlideshow from "../searchResults/imageSlideshow/ImageSlideshow";

const formatPrice = (price) => "$".repeat(price);
const PHOTOS_PER_PAGE = 6;

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoPageIndex, setPhotoPageIndex] = useState(0);
  const reviewsPerPage = 5;
  const { id } = useParams();

  // Toggle to use mock data(true) or real API(false)
  const USE_MOCK_DATA = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (USE_MOCK_DATA) {
          // Mock API call
          data = await fetchMockRestaurantDetails();
        } else {
          // Real API call with dynamic ID
          const restaurantId = id; // Replace with logic to retrieve restaurant ID dynamically
          data = await fetchRealRestaurantDetails(restaurantId);
        }

        if (data) {
          setRestaurant(data); // Assuming data[0] is the required restaurant object
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };
    if (!id) return;
    fetchData();
  }, []);

  const handleNextReviewPage = () => {
    if (currentPage < Math.ceil(restaurant?.reviews?.length / reviewsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousReviewPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPhotoBatch =
    restaurant?.photos?.slice(
      photoPageIndex * PHOTOS_PER_PAGE,
      (photoPageIndex + 1) * PHOTOS_PER_PAGE
    ) || [];

  const handleNextPhotoBatch = () => {
    if (restaurant?.photos?.length <= 0) return;
    if (
      photoPageIndex <
      Math.ceil(restaurant.photos.length / PHOTOS_PER_PAGE) - 1
    ) {
      setPhotoPageIndex(photoPageIndex + 1);
    }
  };
  console.log(restaurant);
  const handlePreviousPhotoBatch = () => {
    if (photoPageIndex > 0) {
      setPhotoPageIndex(photoPageIndex - 1);
    }
  };

  if (!restaurant) return <p>Loading...</p>;

  console.log(restaurant.reviews);
  const totalRating = restaurant.reviews.reduce(
    (sum, entry) => sum + entry.rating,
    0
  );
  const averageRating = totalRating / restaurant.reviews.length;
  return (
    <>
      <NavBar />
      <CssBaseline />
      <Container
        style={{
          marginTop: "40px",
          backgroundColor: "#fff",
          padding: "20px",
          maxWidth: "1400px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Cover photo section */}
        <Box
          component="section"
          textAlign="center"
          mb={4}
          sx={{
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          {/* <img
            src={restaurant.cover || "https://via.placeholder.com/1200x400"}
            alt={restaurant.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          /> */}
          <ImageSlideshow slides={restaurant?.photos} />
        </Box>

        {/* Restaurant Details */}
        <Typography variant="h4" textAlign="center">
          {restaurant.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" textAlign="center">
          {restaurant.address} | {restaurant.zipCode} | Rating:{" "}
          <Rating value={averageRating} precision={0.5} readOnly /> (
          {restaurant.reviews.length}) | Price: {formatPrice(restaurant.price)}
        </Typography>

        {/* Location & Hours Section */}
        <Box mt={4} textAlign="center">
          <Typography variant="h6">Location & Hours</Typography>
          <Typography variant="body2">
            {restaurant.address}, {restaurant.city}, {restaurant.state},{" "}
            {restaurant.zipCode}
          </Typography>
          <Typography variant="body2" color="textSecondary" display="inline">
            Hours:{" "}
          </Typography>
          <Typography variant="body2" display="inline">
            {restaurant.openHour} - {restaurant.closeHour}
          </Typography>
        </Box>

        {/* Cuisines Section */}
        <Typography textAlign="center">
          Cuisines
        </Typography>
        <Box mt={2} textAlign="center">
          {restaurant.cuisines?.map((cuisine) => (
            <Chip
              key={cuisine.id}
              label={cuisine.name}
              style={{ margin: "4px" }}
            />
          ))}
        </Box>

        {/* Food Categories Section */}
        <Typography textAlign="center">
          Food Categories
        </Typography>
        <Box mt={2} textAlign="center">
          {restaurant.foodCategories?.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              style={{ margin: "4px" }}
            />
          ))}
        </Box>

        {/* Button Section */}
        <Box mt={2} textAlign="center">
          <Button
            component={Link}
            to={`/writereviewpage/${id}`}
            variant="contained"
            color="secondary"
          >
            Write a Review
          </Button>
        </Box>

        {/* Photos Section
        <Box mb={4} mt={4}>
          <Typography variant="h6">Photos</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <IconButton
              onClick={handlePreviousPhotoBatch}
              disabled={photoPageIndex === 0}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ width: "80%" }}
            >
              {currentPhotoBatch.map((photo, index) => (
                <Grid item xs={4} sm={2} key={index}>
                  <img
                    src={photo.url}
                    alt={`Photo ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <IconButton onClick={handleNextPhotoBatch}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box> */}
        {/* Reviews Section */}
        <Box mb={4} mt={4}>
          <Typography variant="h6">Recommended Reviews</Typography>
          {restaurant.reviews
            ?.slice()
            .sort((a, b) => b.id - a.id)
            .slice(
              (currentPage - 1) * reviewsPerPage,
              currentPage * reviewsPerPage
            )
            .map((review) => (
              <Box key={review.id} my={2}>
                <Typography variant="body1">
                  <strong>
                    {review.firstName} {review.lastName} on {review.date}
                  </strong>
                </Typography>
                <Rating
                  value={review.rating}
                  precision={0.5}
                  readOnly
                  style={{ marginBottom: "8px" }}
                />
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              onClick={handlePreviousReviewPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography variant="body2">
              Page {currentPage} of{" "}
              {Math.ceil(restaurant.reviews?.length / reviewsPerPage)}
            </Typography>
            <Button
              onClick={handleNextReviewPage}
              disabled={
                currentPage ===
                Math.ceil(restaurant.reviews?.length / reviewsPerPage)
              }
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RestaurantPage;
