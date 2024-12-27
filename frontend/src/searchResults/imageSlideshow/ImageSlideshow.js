import React, { useState } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import { IconButton, Skeleton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
  };

  const goToPreviousSlide = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);
  };
  if (!slides?.length > 0) {
    return <Skeleton height={150} width={150} variant="rectangular" />;
  }

  return (
    <Box className="slideshow-container">
      {slides.map((slide, index) => (
        <Box
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.filepath})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
          height={150}
          width={150}
        ></Box>
      ))}
      <IconButton
        onClick={goToPreviousSlide}
        sx={{
          marginRight: "auto",
        }}
        color="primary"
        size="large"
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton onClick={goToNextSlide} color="primary" size="large">
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default Slideshow;
