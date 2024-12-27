import React from 'react';
import { Container, Grid } from '@mui/material';
import RestaurantCard from './RestaurantCard';
import { useLocation } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader"


const restaurants = [
  {
    id: 1
  },
];

export default function DashboardList() {
  const location = useLocation();
  const { dataArray } = location.state || {};

  return (
      <Grid>
        {
        
        dataArray == null ?
          <div className="load" >
          <BeatLoader
          color={"#2196f3"}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
          /> 
          </div>

          :
        restaurants.map((restaurant) => (
          <Grid item key={restaurant.id}>
            <RestaurantCard restaurant={dataArray} />
          </Grid>
        ))}
      </Grid>
  );
};
