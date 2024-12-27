import React, { useState, useEffect } from 'react';
import { AppBar, Drawer, List, ListItem, ListItemText, TextField, Button, Box, Typography, Toolbar, IconButton, Input, MenuItem, Select, FormControl, InputLabel, Checkbox } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

export default function OwnerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    foodCategories: [],
    cuisines: [],
    rating: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    photos: [],
    openHour: '',
    closeHour: '',
    openStatus: true,
    ownerId: '1',
  });

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await axios.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    }
    fetchRestaurants();
  }, []);

  const handleSelectRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(`/restaurant/${restaurantId}`);
      const restaurant = response.data;
      setSelectedRestaurant(restaurant);
      setFormData({
        name: restaurant.name,
        foodCategories: restaurant.foodCategories,
        cuisines: restaurant.cuisines,
        rating: restaurant.rating,
        price: restaurant.price,
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        zipCode: restaurant.zipCode,
        description: restaurant.description,
        photos: restaurant.photos,
        openHour: restaurant.openHour,
        closeHour: restaurant.closeHour,
        openStatus: restaurant.openStatus,
        ownerId: restaurant.ownerId,
      });
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      photos: files,
    }));
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('foodCategories', JSON.stringify(formData.foodCategories));
      formDataToSend.append('cuisines', JSON.stringify(formData.cuisines));
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('zipCode', formData.zipCode);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('openHour', formData.openHour);
      formDataToSend.append('closeHour', formData.closeHour);
      formDataToSend.append('openStatus', formData.openStatus);
      formDataToSend.append('ownerId', formData.ownerId);

      formData.photos.forEach((photo, index) => {
        formDataToSend.append('photos', photo);
      });

      const response = await axios.put(`/restaurant/${selectedRestaurant.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Restaurant updated:', response.data);
      alert('Restaurant updated successfully!');
    } catch (error) {
      console.error('Error updating restaurant:', error);
      alert('Failed to update restaurant.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Restaurant Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '64px', // To avoid overlap with AppBar
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ padding: 2 }}>Restaurants</Typography>
        <List>
          {restaurants.map((restaurant) => (
            <ListItem button key={restaurant.id} onClick={() => handleSelectRestaurant(restaurant.id)}>
              <ListItemText primary={restaurant.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3, marginTop: '64px' }}>
        {selectedRestaurant ? (
          <Box>
            <Typography variant="h4">Edit {selectedRestaurant.name}</Typography>
            <form>
              <TextField
                label="Restaurant Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Food Categories</InputLabel>
                <Select
                  multiple
                  value={formData.foodCategories}
                  onChange={(e) => handleSelectChange(e, 'foodCategories')}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="Chinese">Chinese</MenuItem>
                  <MenuItem value="Mexican">Mexican</MenuItem>
                  <MenuItem value="Indian">Indian</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Cuisines</InputLabel>
                <Select
                  multiple
                  value={formData.cuisines}
                  onChange={(e) => handleSelectChange(e, 'cuisines')}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="Chinese">Chinese</MenuItem>
                  <MenuItem value="Mexican">Mexican</MenuItem>
                  <MenuItem value="Indian">Indian</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                step="0.1"
                min="0"
                max="5"
              />
              <TextField
                label="Price Range"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Restaurant Image</Typography>
                <Box sx={{ marginBottom: 2 }}>
                  {formData.photos.length > 0 ? (
                    <img
                      src={URL.createObjectURL(formData.photos[0])} // Display first image
                      alt="Restaurant"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography variant="body2">No image selected</Typography>
                  )}
                </Box>
                <Input
                  type="file"
                  inputProps={{ accept: 'image/*' }}
                  onChange={handleImageChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              </Box>
              <TextField
                label="Open Hour"
                name="openHour"
                value={formData.openHour}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="time"
              />
              <TextField
                label="Close Hour"
                name="closeHour"
                value={formData.closeHour}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="time"
              />
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Open Status</Typography>
                <Checkbox
                  checked={formData.openStatus}
                  onChange={() => setFormData((prev) => ({ ...prev, openStatus: !prev.openStatus }))}
                />
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        ) : (
          <Typography variant="h6">Select a restaurant to edit</Typography>
        )}
      </Box>
    </Box>
  );
}
