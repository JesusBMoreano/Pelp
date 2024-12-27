import { Button, Stack } from "@mui/material";
import React from "react";
import SearchBar from "./searchBar/SearchBar";
import Logo from "./logo/Logo";

const Header = () => {
  return (
    <Stack
      direction="row"
      spacing={5}
      p={1}
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{
        backgroundColor: "wheat",
      }}
    >
      <Logo />
      <SearchBar />
      <Button>Yelp for business</Button>
      <Button>Write a review</Button>
      <Button>Start a project</Button>
      <Button variant="outlined">Login</Button>
      <Button variant="contained" color="error">
        Sign Up
      </Button>
    </Stack>
  );
};

export default Header;
