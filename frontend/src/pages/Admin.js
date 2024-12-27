import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import RestaurantList from "../content/RestaurantList";

export default function Admin() {
  return (
    <>
      <NavBar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <RestaurantList />
        </Box>
      </Box>
    </>
  );
}
