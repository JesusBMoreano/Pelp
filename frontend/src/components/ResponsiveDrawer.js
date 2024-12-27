import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

function ResponsiveDrawer(props) {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const [otherMessage, setOtherMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleNavigate = (data) => {
    const dataArray = data;
    navigate("/dashboard", { state: { dataArray } });
  };

  const getRestaurants = async () => {
    try {
      const url = "/restaurants";
      const respo = await axios.get(url, {
        withCredentials: true,
      });
      const filteredRestaurants = respo.data.filter(
        (restaurant) => restaurant.ownerId === 1
      );
      console.log("filteredRestaurants", filteredRestaurants);
      console.log("res", respo);
      setOtherMessage(filteredRestaurants);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getRestaurant = async (value) => {
    try {
      const url = `/restaurant/${value}`;
      const respo = await axios.get(url, {
        withCredentials: true,
      });
      setMessage(respo);
      handleNavigate(respo.data);
    } catch (error) {
      console.error(error);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {loading ? (
          <div className="load">
            <BeatLoader
              color={"#2196f3"}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          otherMessage.map((restaurant) => (
            <ListItem>
              <ListItemButton onClick={() => getRestaurant(restaurant.id)}>
                <ListItemText
                  primary={restaurant.name}
                  secondary={restaurant.cuisine}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
