import React, { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import loginImage from "../styles/picnic.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const notify = () => toast.success("Registration completed! Please Log-in");

  useEffect(() => {
    const register = localStorage.getItem("register");
    if (register == true) {
      notify();
      localStorage.removeItem("register");
    }
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/auth/admin_login", {
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
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      console.log("Signed In!");
      navigate("/admin");
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
            Admin Log In
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
                Sign In
              </Button>
            </form>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
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

export default AdminLogin;
