import React, { useEffect, useState } from "react";
import { Rating, Typography, Stack } from "@mui/material";

const RatingFilter = ({ formData, setFormData }) => {
  return (
    <>
    <Stack direction="column" alignItems="center" sx={{marginLeft: 1, marginRight: 1, marginBottom:-1}}>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={formData?.rating ?? null}
        onChange={(event, newValue) => {
          setFormData((prev) => {
            return { ...prev, rating: newValue };
          });
        }}
        sx= {{color: 'yellow', marginTop: -1}}
      />
    </Stack>
    </>
  );
};

export default RatingFilter;
