import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Navbar from "../components/NavBar";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import "../styles/Business_Register.css";
import businessImage from "../pictures/Business_Image.png";

// Define the functional component
function Business_Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(""); // Reset any previous error message

    try {
      // Send login request to the backend
      const response = await fetch("/auth/businessregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("register", true);

      window.location.href = "/login";
    } catch (error) {
      setErrorMessage("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="log_in_page">
      <Navbar />
      <div className="user_group">
        <div className="user_info">
          <h2 id="log_to_yelp">Business Owner Registration</h2>

          {errorMessage && <p className="error">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <div className="full_name">
              <TextField
                id="firstname_login"
                className="names"
                label="First Name"
                variant="filled"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                id="lastname_login"
                className="names"
                label="Last Name"
                variant="filled"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <TextField
              id="username_register"
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              id="password_register"
              label="Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button id="register_button" type="submit" variant="contained">
              Create Account
            </Button>
          </form>
          <p id="no_account">
            Already Have a Business Account?
            <Link
              underline="none"
              href="http://localhost:3000/login"
              className="links"
            >
              Click Here!
            </Link>
          </p>
        </div>
        <img src={businessImage} className="login-image" />
      </div>
    </div>
  );
}

export default Business_Register;
