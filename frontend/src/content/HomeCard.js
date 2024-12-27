import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

export default function HomeCard({ name, description, imageUrl }) {
  return (
    <Card sx={{ width: 250, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
        sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};