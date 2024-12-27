import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import HomeCard from "../content/HomeCard";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  CssBaseline,
} from "@mui/material";
import { ThumbUp, Star, AccessibleForward } from "@mui/icons-material";
import bg1 from "../pictures/bg1.jpg";
import bg2 from "../pictures/bg2.jpg";
import bg3 from "../pictures/bg3.jpg";
import Footer from "../components/Footer";

const businesses = [
  {
    name: "Joe's Pizza",
    description: "Best pizza in town",
    imageUrl: "https://via.placeholder.com/250x140?text=Pizza",
  },
  {
    name: "Sushi World",
    description: "Fresh sushi and rolls",
    imageUrl: "https://via.placeholder.com/250x140?text=Sushi",
  },
  {
    name: "Green Cafe",
    description: "Healthy food & smoothies",
    imageUrl: "https://via.placeholder.com/250x140?text=Cafe",
  },
  {
    name: "Tech Hub",
    description: "Gadgets and tech accessories",
    imageUrl: "https://via.placeholder.com/250x140?text=Tech",
  },
  {
    name: "Green Cafe",
    description: "Healthy food & smoothies",
    imageUrl: "https://via.placeholder.com/250x140?text=Cafe",
  },
  {
    name: "Tech Hub",
    description: "Gadgets and tech accessories",
    imageUrl: "https://via.placeholder.com/250x140?text=Tech",
  },
];

const images = [bg1, bg2, bg3];

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${images[bgIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        />
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: 1,
            padding: 2,
          }}
        >
          Welcome to Pelp!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            textAlign: "center",
            zIndex: 1,
            padding: 1,
          }}
        >
          Discover the best places around you, wherever you go.
        </Typography>
        <Box
          sx={{
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px", fontWeight: "bold" }}
            onClick={register}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ padding: "10px 20px", fontWeight: "bold" }}
            onClick={login}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Container sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "Black",
            textAlign: "center",
            zIndex: 1,
            padding: 5,
          }}
        >
          Discover the best places around you
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {businesses.map((business, index) => (
            <Grid item key={index}>
              <HomeCard
                name={business.name}
                description={business.description}
                imageUrl={business.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container sx={{ marginTop: 6 }}>
        <Typography
          variant="h4"
          sx={{
            color: "Black",
            textAlign: "center",
            zIndex: 1,
            padding: 5,
          }}
        >
          Why you should trust us
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <CardActionArea>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThumbUp
                    sx={{
                      fontSize: 40,
                      color: "primary.main",
                      marginBottom: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Quality Service
                  </Typography>
                  <Typography variant="body2" align="center">
                    We provide high-quality, reliable services to meet your
                    needs.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardActionArea>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Star
                    sx={{
                      fontSize: 40,
                      color: "primary.main",
                      marginBottom: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Trusted by All
                  </Typography>
                  <Typography variant="body2" align="center">
                    Our platform is trusted by thousands of satisfied customers.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardActionArea>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <AccessibleForward
                    sx={{
                      fontSize: 40,
                      color: "primary.main",
                      marginBottom: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Easy to Use
                  </Typography>
                  <Typography variant="body2" align="center">
                    Our platform is user-friendly and intuitive, designed for
                    everyone.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
