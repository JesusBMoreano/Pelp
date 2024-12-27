import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "../components/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useDropzone } from "react-dropzone";

export default function NewRestaurantPage() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Set the filepaths for the database in set photos
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [openHour, setOpenHour] = useState("");
  const [closeHour, setCloseHour] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [openStatus, setOpenStatus] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const addressString = address + " " + city + " " + state;
    const apiKey = "48d7b6cdd35443939045553bc797db83";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      addressString
    )}&key=${apiKey}`;
    console.log(selectedCuisines);
    console.log(selectedCategories);
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        const response2 = await axios.post("/restaurant/newRestaurant", {
          name: name,
          foodCategories: selectedCategories,
          cuisines: selectedCuisines,
          rating: rating,
          price: price,
          address: address,
          city: city,
          state: state,
          zipCode: zipCode,
          lat: lat,
          lon: lng,
          description: description,
          photos: photos,
          openHour: openHour,
          closeHour: closeHour,
          ownerId: ownerId,
          openStatus: openStatus,
        });
        console.log(response2.data);
        setSuccess(true);
        navigate("/dashboard");
      } else {
        console.log("No results found for this address.");
        setError("No results found for this address.");
        setOpenDialog(true);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
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

    const fetchUserName = async () => {
      try {
        const jwtToken = localStorage.getItem("token");
        const payload = jwtToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        const userName = decodedPayload.username;
        const response = await axios.get(`/users/user/${userName}`);
        setOwnerId(response.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserName();
    fetchCuisines();
    fetchCategories();
  }, []);
  console.log(selectedCategories);

  const handleChangeCategories = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeCuisines = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCuisines(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
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
            Let's Start Setting Up Your Business
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>
                    Enter Business Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    name={"name"}
                    value={name}
                    size="small"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>Enter Cuisines</Typography>
                  <Select
                    fullWidth
                    size="small"
                    labelId="cuisine-multiselect-label"
                    id="cuisine-multiselect"
                    multiple
                    value={selectedCuisines}
                    onChange={handleChangeCuisines}
                    input={<OutlinedInput label="Select Cuisines" />}
                    renderValue={(selected) =>
                      selected.map((item) => item.name).join(", ")
                    }
                  >
                    {cuisines.map((cuisine) => (
                      <MenuItem key={cuisine.id} value={cuisine}>
                        <Checkbox
                          checked={selectedCuisines.some(
                            (item) => item.id === cuisine.id
                          )}
                        />
                        <ListItemText primary={cuisine.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>
                    Enter Categories
                  </Typography>
                  <Select
                    fullWidth
                    size="small"
                    multiple
                    value={selectedCategories}
                    onChange={handleChangeCategories}
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>
                    Enter Open Hours
                  </Typography>
                  <TextField
                    variant="outlined"
                    name={"category"}
                    value={openHour}
                    size="small"
                    onChange={(e) => setOpenHour(e.target.value)}
                    fullWidth
                    required
                    type="time"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>
                    Enter Closing Hours
                  </Typography>
                  <TextField
                    variant="outlined"
                    name={"hours"}
                    value={closeHour}
                    size="small"
                    onChange={(e) => setCloseHour(e.target.value)}
                    fullWidth
                    required
                    type="time"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>Enter Price</Typography>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      labelId="number-select-label"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <MenuItem value={1}>$</MenuItem>
                      <MenuItem value={2}>$$</MenuItem>
                      <MenuItem value={3}>$$$</MenuItem>
                      <MenuItem value={4}>$$$$</MenuItem>
                      <MenuItem value={5}>$$$$$</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>
                    Enter Description
                  </Typography>
                  <TextField
                    variant="outlined"
                    name={"description"}
                    value={description}
                    size="small"
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"subtitle2"}>Enter Address</Typography>
                  <TextField
                    variant="outlined"
                    name={"address"}
                    value={address}
                    size="small"
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>Enter City</Typography>
                  <TextField
                    variant="outlined"
                    name={"city"}
                    value={city}
                    size="small"
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>Enter State</Typography>
                  <TextField
                    variant="outlined"
                    name={"state"}
                    value={state}
                    size="small"
                    onChange={(e) => setState(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={"subtitle2"}>Enter ZipCode</Typography>
                  <TextField
                    variant="outlined"
                    name={"zipCode"}
                    value={zipCode}
                    size="small"
                    onChange={(e) => setZipCode(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item container xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Restaurant
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Alert severity="error">{error}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
