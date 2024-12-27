import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import BeatLoader from "react-spinners/BeatLoader";
import ListItemButton from "@mui/material/ListItemButton";

export default function RestaurantCard({ restaurant }) {
  const {
    address,
    city,
    description,
    openHours,
    closeHours,
    name,
    photos,
    price,
    rating,
    state,
    zipCode,
    id,
    foodCategories,
    cuisines,
    openStatus,
    ownerId,
  } = restaurant;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherMessage, setOtherMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    foodCategories: [],
    cuisines: [],
    rating: "",
    price: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    description: "",
    photos: [],
    openHour: "",
    closeHour: "",
    openStatus: true,
  });

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    try {
      const url = "/restaurants";
      const respo = await axios.get(url, {
        withCredentials: true,
      });
      const filteredRestaurants = respo.data.filter(
        (restaurant) => restaurant.ownerId === 1
      );
      console.log("filteredRestaurants", filteredRestaurants);
      console.log("res", respo);
      setOtherMessage(filteredRestaurants);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getRestaurant = async (value) => {
    try {
      const url = `/restaurant/${value}`;
      const respo = await axios.get(url, {
        withCredentials: true,
      });
      setMessage(respo);
      handleNavigate(respo.data);
    } catch (error) {
      console.error(error);
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

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append(
        "foodCategories",
        JSON.stringify(formData.foodCategories)
      );
      formDataToSend.append("cuisines", JSON.stringify(formData.cuisines));
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("zipCode", formData.zipCode);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("openHour", formData.openHour);
      formDataToSend.append("closeHour", formData.closeHour);
      formDataToSend.append("openStatus", formData.openStatus);
      formDataToSend.append("ownerId", formData.ownerId);

      formData.photos.forEach((photo, index) => {
        formDataToSend.append("photos", photo);
      });
      await axios.put(`/restaurant/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("User info updated:", userInfo);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleSelectRestaurant = async (restaurantId) => {
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
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pelp
          </Typography>

          <Box sx={{ display: "flex" }}>
            {/* Common menu item for everyone */}
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>

            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>

            <Button color="inherit" component={Link} to="/newrestaurant">
              Add Restaurant
            </Button>

            <>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            marginTop: "64px", // To avoid overlap with AppBar
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          Restaurants
        </Typography>
        <List>
          {loading ? (
            <div className="load">
              <BeatLoader
                color={"#2196f3"}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            otherMessage.map((restaurant) => (
              <ListItem>
                <ListItemButton
                  onClick={() => handleSelectRestaurant(restaurant.id)}
                >
                  <ListItemText primary={restaurant.name} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Drawer>

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
          <Typography component="h1" variant="h5">
            Edit Business
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSave}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>Business Name</Typography>
                  <TextField
                    variant="outlined"
                    name={"name"}
                    placeholder={name}
                    size="small"
                    onChange={handleChange}
                    disabled={!isEditing}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>Category</Typography>
                  <TextField
                    variant="outlined"
                    disabled={!isEditing}
                    name={"category"}
                    placeholder={foodCategories}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>
                    Enter Open Hours
                  </Typography>
                  <TextField
                    variant="outlined"
                    name={"category"}
                    value={openHours}
                    size="small"
                    onChange={(e) => setOpenHours(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>
                    Enter Closing Hours
                  </Typography>
                  <TextField
                    variant="outlined"
                    name={"hours"}
                    value={closeHours}
                    size="small"
                    onChange={(e) => setClosed(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>Price</Typography>
                  <TextField
                    variant="outlined"
                    disabled={!isEditing}
                    name={"price"}
                    placeholder={price}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>Description</Typography>
                  <TextField
                    variant="outlined"
                    disabled={!isEditing}
                    name={"description"}
                    placeholder={description}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>Address</Typography>
                  <TextField
                    variant="outlined"
                    disabled={!isEditing}
                    name={"address"}
                    placeholder={address}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>City</Typography>
                  <TextField
                    variant="outlined"
                    name={"city"}
                    disabled={!isEditing}
                    placeholder={city}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>State</Typography>
                  <TextField
                    variant="outlined"
                    name={"state"}
                    disabled={!isEditing}
                    placeholder={state}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>ZipCode</Typography>
                  <TextField
                    variant="outlined"
                    name={"zipCode"}
                    disabled={!isEditing}
                    placeholder={zipCode}
                    size="small"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item container xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={1}
                    maxWidth={600}
                    margin={"0 auto"}
                    marginTop={"5vh"}
                  >
                    {!isEditing ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditToggle}
                        fullWidth
                      >
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSave}
                          fullWidth
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleEditToggle}
                          style={{ marginLeft: 8 }}
                          fullWidth
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
