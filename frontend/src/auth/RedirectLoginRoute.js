import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import WriteReviewPage from "../pages/WriteReviewPage";

const RedirectLoginRoute = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);

  return <WriteReviewPage />;
};

export default RedirectLoginRoute;
