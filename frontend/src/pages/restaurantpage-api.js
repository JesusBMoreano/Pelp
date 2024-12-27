// src/components/restaurantpage-api.js
import axios from "axios";

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`/review/newReview`, reviewData);
    return response.data; // Backend response
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const fetchRestaurantDetails = async (restaurantId) => {
  try {
    const response = await axios.get(`/restaurant/${restaurantId}`);
    return response.data; // This should be the specific restaurant object
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return null;
  }
};
