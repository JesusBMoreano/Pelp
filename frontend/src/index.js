import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Log_In from "./pages/Log_In";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import NewRestaurant from "./pages/NewRestaurant";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Search from "./search/Search";
import { createTheme, ThemeProvider } from '@mui/material';
import Business_Log_In from './pages/Business_Log_in';
import RestaurantPage from './pages/RestaurantPage';
import WriteReviewPage from './pages/WriteReviewPage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BusinessRegister from "./pages/BusinessRegister";
import AdminLogin from "./pages/AdminLogin";
import Test from "./pages/Test";
import Error from "./pages/Error";
import ProtectedAuthRoute from './auth/ProtectedAuthRoute';
import ProtectedRoutes from "./auth/ProtectedRoutes";
import RedirectLoginRoute from "./auth/RedirectLoginRoute";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#B22222',
    },
    secondary: {
      main: '#F5F5DC',
    },
    background: {
      default: '#f4f4f4',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/restaurantpage/:id" element={<RestaurantPage/>}/>
            <Route path="/test" element={<Test/>} />

            {/* Redirect Client Route */}
            <Route element={<RedirectLoginRoute/>}>
              <Route path="/writereviewpage/:id" element={<WriteReviewPage/>}/>
            </Route>
            
            <Route path="/admin" element={<Admin />} />
          
            <Route path="/newrestaurant" element={<NewRestaurant />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Protected Login Route */}
            <Route element={<ProtectedAuthRoute />}>
              <Route path="/login" element={<Log_In />} />
              <Route path="/register" element={<Register />} />
              <Route path="/businesslogin" element={<Business_Log_In />} />
              <Route path="/businessregister" element={<BusinessRegister/>} />
            </Route>
            
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/error" element={<Error/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
