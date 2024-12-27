import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "800px",
};
// San Joes default Zip Code
const defaultCenter = {
  lat: +37.3387,
  lng: -121.8853,
};

const SearchMap = ({ databaseMarkers }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCucxxPODPpr62_EBQ831bfotGpKmcOAno", // GOOGLE API KEY.
    libraries: ["places"],
  });
  const [searchParams] = useSearchParams();
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const geocodeZipCode = async (zipCode) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: zipCode }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject("Geocoding failed: " + status);
        }
      });
    });
  };

  const searchNearbyPlaces = async (location) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    return new Promise((resolve, reject) => {
      service.nearbySearch(
        {
          location: location,
          radius: 2000,
          type: "cafe",
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            reject("Nearby search failed: " + status);
          }
        }
      );
    });
  };

  const handleZipCodeSearch = useCallback(
    async (zipCode) => {
      try {
        const location = await geocodeZipCode(zipCode);
        setMapCenter(location.toJSON());
        const places = await searchNearbyPlaces(location);
        const googleMarkers = places.map((place) => ({
          geometry: {
            location: place.geometry.location.toJSON(),
          },
          name: place.name,
        }));

        // Combine Google markers with database markers
        const combinedMarkers = [...googleMarkers, ...databaseMarkers];
        console.log("Markers", combinedMarkers);

        setMarkers(combinedMarkers);
      } catch (error) {
        console.error(error);
      }
    },
    [databaseMarkers]
  );

  useEffect(() => {
    const zipCode = searchParams.get("zipCode");
    if (zipCode && isLoaded  && zipCode?.length > 0) {
      handleZipCodeSearch(zipCode);
      console.log("hello")
    } else if (isLoaded && !zipCode) {
      // If no zip code, just display database markers
      console.log('hello 2', databaseMarkers)
      setMarkers(
       databaseMarkers
      );
    }
  }, [searchParams, isLoaded, handleZipCodeSearch, databaseMarkers]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
      {markers?.length > 0 &&
        markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={marker.geometry.location}
            title={marker.name}
          />
        ))}
    </GoogleMap>
  ) : (
    <Skeleton
      height={containerStyle.height}
      width={containerStyle.width}
      variant="rectangular"
    ></Skeleton>
  );
};

export default React.memo(SearchMap);
