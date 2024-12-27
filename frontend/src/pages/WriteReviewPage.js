import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Rating,
} from "@mui/material";
// Import API logic for submitting a review
import { submitReview as apiSubmitReview } from "./restaurantpage-api"; // Replace with your API file
import { submitReview as mockSubmitReview } from "./api-mock"; // Mock API function
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const WriteReviewPage = () => {
  const [rating, setRating] = useState(0.0);
  const [reviewText, setReviewText] = useState("");
  const USE_MOCK_DATA = false; // Toggle between mock data (true) and API (false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const jwtToken = localStorage.getItem("token");
        const payload = jwtToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        const userName = decodedPayload.username;
        console.log(decodedPayload);
        const response = await axios.get(`/users/user/${userName}`);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserName();
  }, []);

  console.log(firstName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the review data
    const reviewData = {
      restaurantId: id,
      rating: rating,
      comment: reviewText,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      if (USE_MOCK_DATA) {
        // Submit to mock API
        await mockSubmitReview(reviewData);
        console.log("Mock review submitted:", reviewData);
      } else {
        // Submit to backend API
        await apiSubmitReview(reviewData); // Ensure this function is implemented in your API
        console.log("API review submitted:", reviewData);
      }

      // Display success message and clear the form after submission
      setSuccessMessage("Review submitted successfully!");
      setErrorMessage("");
      setRating(0.0);
      setReviewText("");
      navigate(`/restaurantpage/${id}`);
    } catch (error) {
      // Handle errors and display error message
      console.error("Error submitting review:", error);
      setErrorMessage("Failed to submit the review. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" mb={2}>
        Write a Review
      </Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}
      <form onSubmit={handleSubmit}>
        {/* Rating input with half-star precision */}
        <Box mb={2}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            precision={0.5} // Enable half-star ratings
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>

        {/* Review text input */}
        <TextField
          label="Your Review"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        {/* Submit button */}
        <Button
          type="submit"
          sx={{ marginRight: 2 }}
          variant="contained"
          color="primary"
        >
          Submit Review
        </Button>
        <Button
          component={Link}
          to={`/restaurantpage/${id}`}
          variant="contained"
          color="secondary"
        >
          Back
        </Button>
      </form>
    </Container>
  );
};

export default WriteReviewPage;
