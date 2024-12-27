import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAuthRoutes = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            try {
                // Token exists, set signed-in state to true
                setIsSignedIn(true);
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []); 

    return (
        isSignedIn ? <Navigate to="/" /> : <Outlet /> 
    )
}

export default ProtectedAuthRoutes;