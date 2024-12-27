import React from 'react';
import { Box, Typography, Grid, Link, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: '20px',
        marginTop: 'auto',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Pelp Business
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <Link
              variant="body2" 
              component={RouterLink}
              to="/businesslogin" 
              sx={{ marginTop: 1, color: 'white', display: 'block', marginBottom: 1 }}
            >
              Business Log-In
            </Link>
            <Link
              variant="body2" 
              component={RouterLink}
              to="/businessregister" 
              sx={{ marginTop: 1, color:'white', display: 'block', marginBottom: 1 }}
            >
              Business Register
            </Link>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Quick Links
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: 1, textDecoration: 'none', }}>
              About Us
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: 1, textDecoration: 'none', }}>
              Contact
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: 1, textDecoration: 'none', }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: 1, textDecoration: 'none', }}>
              Privacy Policy
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Follow Us
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <Link href="#" color="inherit" sx={{ marginRight: 2,textDecoration: 'none', }}>
              Facebook
            </Link>
            <Link href="#" color="inherit" sx={{ marginRight: 2, textDecoration: 'none' }}>
              Twitter
            </Link>
            <Link href="#" color="inherit" sx={{textDecoration: 'none',}}>
              Instagram
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Pelp. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

