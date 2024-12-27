import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
//import Footer from './components/Footer_Parts/Footer';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import { CssBaseline } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";

function Business_Log_In() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const notify = () => toast.success("Registration completed! Please Log-in");

  // Check for registration and display success message if present
  useEffect(() => {
    const register = localStorage.getItem("register");
    if (register == true) {
      notify(); // Show success message
      localStorage.removeItem("register"); // Clear it to prevent re-triggering
    }
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(""); // Reset any previous error message

    try {
      // Send login request to the backend
      const response = await fetch("/auth/business_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        setError("User or password is incorrect");
        setOpenDialog(true);
      }

      const data = await response.json();

      // Store the JWT token in localStorage
      localStorage.setItem("token", data.token);

      const isLoggedIn = !!localStorage.getItem("token");
      const userType = "BUSINESS";

      console.log("Signed In!");
      navigate("/newrestaurant");
      //window.location.href = '/dashboard';  // Change later to home page or user page
    } catch (error) {
      setError("User or password is incorrect");
      setOpenDialog(true);
    }
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Business Log In
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleLogin}>
              <TextField
                id="username_login"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                id="password_login"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log in
              </Button>
            </form>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/businessregister" variant="body2">
                  {"Don't have an account? Register Here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Alert severity="error">{error}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Business_Log_In;
