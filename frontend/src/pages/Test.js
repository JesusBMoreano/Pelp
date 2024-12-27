import React, { useState, useEffect } from "react";
import {
  AppBar,
  Grid,
  Drawer,
  OutlinedInput,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Typography,
  Toolbar,
  IconButton,
  Input,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userOwnerId, setUserOwnerId] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    // foodCategories: [],
    // cuisines: '',
    rating: "",
    ratingCount: "",
    price: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    lat: "",
    lon: "",
    description: "",
    openHour: "",
    closeHour: "",
    openStatus: "",
    ownerId: "",
  });

  useEffect(() => {
    async function fetchUserName() {
      try {
        const jwtToken = localStorage.getItem("token");
        const payload = jwtToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        const userName = decodedPayload.username;
        const response = await axios.get(`/users/user/${userName}`);
        setUserOwnerId(response.data.id);
        console.log(ownerId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchRestaurants() {
      try {
        if (!userOwnerId) {
          console.error("userOwnerId is not set yet");
          return;
        }
        const response = await axios.get("/restaurants");
        const response2 = await axios.get("/restaurant/1");
        const filteredRestaurants = response.data.filter(
          (restaurant) => restaurant.ownerId === userOwnerId
        );
        console.log("filteredRestaurants", filteredRestaurants);
        setRestaurants(filteredRestaurants);
        console.log(response);
        console.log(response2.data.foodCategories);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/foodCategory");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchCuisines = async () => {
      try {
        const response = await axios.get("/cuisine");
        setCuisines(response.data);
      } catch (error) {
        console.error("Error fetching cuisines", error);
      }
    };

    fetchCuisines();
    fetchCategories();
    fetchUserName().then(() => {
      fetchRestaurants();
    });
  }, [userOwnerId]);

  const handleSelectRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(`/restaurant/${restaurantId}`);
      const restaurant = response.data;
      setSelectedRestaurant(restaurant);
      setFormData({
        name: restaurant.name,
        // foodCategories: restaurant.foodCategories,
        // cuisines: restaurant.cuisines,
        rating: restaurant.rating,
        ratingCount: restaurant.ratingCount,
        price: restaurant.price,
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        zipCode: restaurant.zipCode,
        description: restaurant.description,
        // photos: restaurant.photos,
        openHour: restaurant.openHour,
        closeHour: restaurant.closeHour,
        openStatus: restaurant.openStatus,
        ownerId: restaurant.ownerId,
      });
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
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
    const addressString =
      formData.address + " " + formData.city + " " + formData.state;
    const apiKey = "48d7b6cdd35443939045553bc797db83";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      addressString
    )}&key=${apiKey}`;
    console.log(addressString);
    try {
      const res = await axios.get(url);
      const { lat, lng } = res.data.results[0].geometry;
      const updatedFormData = {
        ...formData,
        lat,
        lon: lng,
      };
      const response = await axios.put(
        `/restaurant/${selectedRestaurant.id}`,
        updatedFormData
      );
      console.log("Restaurant updated:", response.data);
      alert("Restaurant updated successfully!");
    } catch (error) {
      console.log(error);
      console.error("Error updating restaurant:", error);
      alert("Failed to update restaurant.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pelp
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>

            <Button color="inherit" component={Link} to="/newrestaurant">
              Add Restaurant
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          Restaurants
        </Typography>
        <List>
          {restaurants.map((restaurant) => (
            <ListItem
              button
              key={restaurant.id}
              onClick={() => handleSelectRestaurant(restaurant.id)}
            >
              <ListItemText primary={restaurant.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedRestaurant ? (
            <Box>
              <Typography component="h1" variant="h5">
                Edit {selectedRestaurant.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <form>
                  <TextField
                    label="Restaurant Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                  />
                  {/* <FormControl fullWidth margin="normal">
                <InputLabel>Cuisines</InputLabel>
                <Select
                  multiple
                  value={formData.cuisines}
                  onChange={(e) => handleSelectChange(e, 'cuisines')}
                  renderValue={(selected) => selected.join(', ')}
                >
              {formData.cuisines.map((cuisine) => (
              <MenuItem key={cuisine.id} value={cuisine}>
                <Checkbox checked={selectedCuisines.some(item => item.id === cuisine.id)} />
                <ListItemText primary={cuisine.name} />
              </MenuItem>
        ))}
                </Select>
              </FormControl> */}
                  {/* <FormControl fullWidth margin="normal">
               <InputLabel>Cuisines</InputLabel>
               <Typography variant={'subtitle2'}>
                  Enter Cuisines
                </Typography>
        <Select
        fullWidth
        size="small"
        labelId="cuisine-multiselect-label"
        id="cuisine-multiselect"
        multiple
        value={selectedCuisines}
        onChange={(e) => handleSelectChange(e, 'cuisines')}
        input={<OutlinedInput label="Select Cuisines" />}
        renderValue={(selected) => selected.map(item => item.name).join(', ')}
      >
        {cuisines.map((cuisine) => (
          <MenuItem key={cuisine.id} value={cuisine}>
            <Checkbox checked={selectedCuisines.some(item => item.id === cuisine.id)} />
            <ListItemText primary={cuisine.name} />
          </MenuItem>
        ))}
      </Select>
      </FormControl>  */}
                  {/* <FormControl fullWidth margin="normal">
               <InputLabel>Food Categories</InputLabel>
      <Select
                fullWidth
                size="small"
        multiple
        value={selectedCategories}
        onChange={handleChange}
        input={<OutlinedInput label="Select Categories" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.name}>
            <Checkbox checked={selectedCategories.indexOf(category.id) > -1} />
            <ListItemText primary={category.name} />
          </MenuItem>
        ))}
      </Select>
      </FormControl>  */}
                  {/* <FormControl fullWidth margin="normal">
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
              </FormControl> */}
                  <TextField
                    label="Open Hours"
                    name="openHour"
                    value={formData.openHour}
                    onChange={handleChange}
                    margin="normal"
                    type="time"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Close Hours"
                    name="closeHour"
                    value={formData.closeHour}
                    onChange={handleChange}
                    margin="normal"
                    type="time"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                  <FormControl fullWidth margin="normal" size="small">
                    <InputLabel>Price</InputLabel>
                    <Select
                      labelId="number-select-label"
                      value={formData.price}
                      onChange={handleChange}
                      name="price"
                    >
                      <MenuItem value={1}>$</MenuItem>
                      <MenuItem value={2}>$$</MenuItem>
                      <MenuItem value={3}>$$$</MenuItem>
                      <MenuItem value={4}>$$$$</MenuItem>
                      <MenuItem value={5}>$$$$$</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    size="small"
                    variant="outlined"
                    rows={4}
                  />
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Restaurant Image</Typography>
                    {/* <Box sx={{ marginBottom: 2 }}>
                  {formData.photos.length > 0 ? (
                    <img
                      src={URL.createObjectURL(formData.photos[0])} // Display first image
                      alt="Restaurant"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography variant="body2">No image selected</Typography>
                  )}
                </Box> */}
                    <Input
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={handleImageChange}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Open Status</Typography>
                    <Checkbox
                      checked={formData.openStatus}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          openStatus: !prev.openStatus,
                        }))
                      }
                    />
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6">Select a restaurant to edit</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
