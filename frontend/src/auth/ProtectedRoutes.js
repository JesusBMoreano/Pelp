import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ userType }) => {
    const [userRole, setUserRole] = useState('guest');

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            try {
                const payload = jwtToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                const newUserRole = decodedPayload.userRole;
                setUserRole(newUserRole);
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []);

return (
    (userRole?.toLowerCase() === userType?.toLowerCase()) ? <Outlet /> : <Navigate to='/error' />
  )
}

export default ProtectedRoutes;