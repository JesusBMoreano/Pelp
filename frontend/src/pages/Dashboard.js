import React, { useState, useEffect, useCallback } from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
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
  Stack,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";

export default function Dashboard() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [photosToUpload, setPhotosToUpload] = useState([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);

  const uploadPhotos = async (files) => {
    const formData = new FormData();

    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      if (!selectedRestaurant) {
        console.log("No selected restaurant");
        return;
      }
      const response = fetch(
        "/restaurant/" + selectedRestaurant?.id + "/photos",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = response.json();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleDeleteImageCheckboxChange = (imageId) => {
    setPhotosToDelete((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
  };

  const handleDeletePhotos = async () => {
    if (!selectedRestaurant) return;

    await axios.delete("/restaurant/" + selectedRestaurant?.id + "/photos", {
      data: {
        photoIds: photosToDelete,
        id: selectedRestaurant?.id,
      },
    });
  };
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setPhotosToUpload(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const thumbs = photosToUpload.map((file) => (
    <Box
      key={file.name}
      component="div"
      width={150}
      height={150}
      style={{
        border: "1px dotted gray",
      }}
    >
      <Box
        style={{
          maxHeight: "inherit",
          maxWidth: "inherit",
        }}
      >
        <img
          style={{
            width: 150,
            height: 150,
            objectFit: "cover",
          }}
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </Box>
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      photosToUpload.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [photosToUpload]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userOwnerId, setUserOwnerId] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    // foodCategories: [],
    // cuisines: [],
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
        const filteredRestaurants = response.data.filter(
          (restaurant) => restaurant.ownerId === userOwnerId
        );
        console.log("filteredRestaurants", filteredRestaurants);
        setRestaurants(filteredRestaurants);
        console.log(response);
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

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant((prev) => restaurant);
  };

  useEffect(() => {
    if (!selectedRestaurant) return;
    setFormData({
      ...selectedRestaurant,
    });
  }, [selectedRestaurant]);

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
      const response = await axios.put(`/restaurant/${selectedRestaurant.id}`, {
        updatedFormData,
      });
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
              onClick={() => handleSelectRestaurant(restaurant)}
            >
              <ListItemText primary={restaurant.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Container component="main">
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
                  {/* <FormControl fullWidth margin="normal" >
                    <InputLabel>Cuisines</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      labelId="cuisine-multiselect-label"
                      id="cuisine-multiselect"
                      multiple
                      value={selectedCuisines}
                      onChange={handleChange}
                      input={<OutlinedInput label="Select Cuisines" />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {cuisines.map((cuisine) => (
                        <MenuItem key={cuisine.id} value={cuisine.name}>
                          <Checkbox
                            checked={selectedCuisines.indexOf(cuisine.id) > -1}
                          />
                          <ListItemText primary={cuisine.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Food Categories</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      multiple
                      value={selectedCategories}
                      onChange={handleChange}
                      input={<OutlinedInput label="Select Categories" />}
                      renderValue={(selected) =>
                        selected.map((item) => item.name).join(", ")
                      }
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category}>
                          <Checkbox
                            checked={selectedCategories.some(
                              (item) => item.id === category.id
                            )}
                          />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    <Typography variant="h6">Upload New Photos</Typography>
                    <div
                      {...getRootProps()}
                      style={{
                        backgroundColor: "#fafafa",
                        border: "1px solid gray",
                        padding: 5,
                        width: "100%",
                        height: "150px",
                        textAlign: "center",
                      }}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag and drop some images here, or click to select
                          images
                        </p>
                      )}
                    </div>
                    <Stack
                      mt={2}
                      mb={2}
                      direction="row"
                      width="100%"
                      spacing={1}
                    >
                      {thumbs}
                    </Stack>
                    <Button
                      variant="outlined"
                      disabled={photosToUpload?.length > 0 ? false : true}
                      onClick={(e) => {
                        uploadPhotos(photosToUpload);
                      }}
                      sx={{
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                    >
                      UPLOAD PHOTOS
                    </Button>
                    <Typography variant="h6">
                      Delete Restaurant Photos
                    </Typography>
                    <Divider />
                    <Stack spacing={2} width="100%" mt={2}>
                      {selectedRestaurant?.photos?.map((photo) => (
                        <Stack
                          key={photo.id}
                          direction="row"
                          width="100%"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <Checkbox
                            checked={photosToDelete?.includes(photo.id)}
                            onChange={() =>
                              handleDeleteImageCheckboxChange(photo.id)
                            }
                          />
                          <img
                            width="150px"
                            height="150px"
                            src={photo.filepath}
                          />
                        </Stack>
                      ))}
                    </Stack>
                    <Divider />
                    <Button
                      color="error"
                      variant="contained"
                      sx={{
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                      onClick={handleDeletePhotos}
                      disabled={photosToDelete?.length > 0 ? false : true}
                    >
                      DELETE PHOTOS
                    </Button>
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
