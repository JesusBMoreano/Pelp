import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import SearchResult from "../searchResults/SearchResult";
import Pagination from "@mui/material/Pagination";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SearchMap from "../maps/SearchMap";

const Search = () => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const { pathname, search } = useLocation();
  const fetchRestaurants = (page = 1) =>
    fetch(pathname + search + "&page=" + page).then((res) => res.json());
  const { isPending, error, data } = useQuery({
    queryKey: ["search", page, search],
    queryFn: () => fetchRestaurants(page),
    keepPreviousData: true,
  });

  const createMarkers = (restaurants) => {
    return restaurants?.map((res) => ({
      name: res.name,
      geometry: {
        location: {
          lat: parseFloat(res.lat),
          lng: parseFloat(res.lon),
        },
      },
    }));
  };

  // TODO: Add loading and error states

  if (isPending) {
    return (
      <Stack
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }
  if (error) {
    return <error>{error.message}</error>;
  }
  return (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
      maxWidth="100vw"
    >
      <NavBar />
      <Stack direction="row" spacing={2} width="90%">
        <Stack width="100%" spacing={2}>
          {data.restaurants.length === 0 && (
            <Typography variant="h3">
              No restaurants found. Try searching something else
            </Typography>
          )}
          {data.restaurants?.map((res) => (
            // TODO: pass restaurant object as DAO
            <SearchResult
              key={res.id}
              id={res.id}
              restaurantName={res.name}
              ratingNumber={res.ratingCount}
              ratingValue={res.rating}
              cuisineValue={res.cuisines}
              foodCategoryValue={res.foodCategories}
              dollarValue={res.price}
              locationValue={res.address}
              closingTime={res.closeHour}
              openTime={res.openHour}
              photos={res.photos}
              reviews={res.reviews}
            />
          ))}
        </Stack>
        <SearchMap databaseMarkers={createMarkers(data?.restaurants)} />
      </Stack>
      {data.restaurants.length > 0 && (
        <Pagination
          page={page}
          count={data.totalPages}
          onChange={handlePageChange}
        />
      )}
    </Stack>
  );
};

export default Search;
