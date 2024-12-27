// src/components/api.js

import coverImg from '../pictures/cover-img.jpg';
import item1Img from '../pictures/item1.jpg';
import item2Img from '../pictures/item2.jpg';
import item3Img from '../pictures/item3.jpg';
import item4Img from '../pictures/item4.jpg';
import item5Img from '../pictures/item5.jpg';
import item6Img from '../pictures/item6.jpg';
import item7Img from '../pictures/item7.jpg';
import item8Img from '../pictures/item8.jpg';
import item9Img from '../pictures/item9.jpg';
import item10Img from '../pictures/item10.jpg';
import item11Img from '../pictures/item11.jpg';
import item12Img from '../pictures/item12.jpg';
import item13Img from '../pictures/item13.jpg';
import item14Img from '../pictures/item14.jpg';
import item15Img from '../pictures/item15.jpg';
import item16Img from '../pictures/item16.jpg';

export const submitReview = async (reviewData) => {
  console.log("Mock API received review:", reviewData);
  return { success: true }; // Mock response
};

export const fetchRestaurantDetails = async () => {
  // Return mock data directly, no axios or network calls
  return Promise.resolve([
    {
      id: 1,
      name: 'Mock Restaurant',
      foodCategories: ["Chinese", "Vegetarian"],
      rating: 4.5,
      ratingCount: 10,
      price: 2,
      address: '123 Main St',
      city: 'Cityville',
      state: 'CA',
      zipCode: '12345',
      openHour: 'Mon-Fri: 9am - 10pm',
      closeHour: 'Sat-Sun: 11am - 11pm', // Updated with hours
      description: 'a restaurant',
      photos: [
        { url: item1Img },
        { url: item2Img },
        { url: item3Img },
        { url: item4Img },
        { url: item5Img },
        { url: item6Img },
        { url: item7Img },
        { url: item8Img },
        { url: item9Img },
        { url: item10Img },
        { url: item11Img },
        { url: item12Img },
        { url: item13Img },
        { url: item14Img },
        { url: item15Img },
        { url: item16Img }
      ],
      cuisines: ['Vegan', 'Delivery', 'Family Friendly'],
      reviews: [
        { id: 1, author: 'John Doe', rating: 4.5, comment: 'Great food and service!' },
        { id: 2, author: 'Jane Doe', rating: 4.0, comment: 'Loved the ambiance!' },
        { id: 3, author: 'Alex Smith', rating: 5.0, comment: 'Pizza was fantastic!' },
        { id: 4, author: 'Maria Garcia', rating: 3.5, comment: 'Friendly staff, but a bit noisy.' },
        { id: 5, author: 'James Lee', rating: 5.0, comment: 'Best pizza in town!' },
        { id: 6, author: 'Erma Wilson', rating: 4.0, comment: 'Quick service and amazing taste!' },
        { id: 7, author: 'Olivia Brown', rating: 4.5, comment: 'Affordable prices and delicious food.' },
        { id: 8, author: 'Liam Johnson', rating: 5.0, comment: 'Highly recommend this place!' },
        { id: 9, author: 'Noah Davis', rating: 4.0, comment: 'Great variety of toppings.' },
        { id: 10, author: 'Sophia Martinez', rating: 3.5, comment: 'Lovely atmosphere.' },
        { id: 11, author: 'Chris Evans', rating: 4.0, comment: 'Very welcoming staff and clean environment.' },
        { id: 12, author: 'Emma Thompson', rating: 3.0, comment: 'Food was good but a bit overpriced.' },
        { id: 13, author: 'Henry Miller', rating: 4.5, comment: 'Loved the drinks and desserts.' },
        { id: 14, author: 'Linda Brown', rating: 2.5, comment: 'Food was cold when served, not ideal.' },
        { id: 15, author: 'Steve Rogers', rating: 4.0, comment: 'Good pizza, but a bit crowded.' },
        { id: 16, author: 'Natalie Portman', rating: 5.0, comment: 'The service was excellent, will return!' },
        { id: 17, author: 'Bruce Wayne', rating: 3.0, comment: 'Average experience, nothing special.' },
        { id: 18, author: 'Diana Prince', rating: 4.5, comment: 'Best spot for a quick bite!' },
        { id: 19, author: 'Clark Kent', rating: 3.5, comment: 'Good food, but the waiting time was long.' },
        { id: 20, author: 'Lois Lane', rating: 4.0, comment: 'Nice place, enjoyed the ambiance and food.' }
      ]
    }
  ]);
};
