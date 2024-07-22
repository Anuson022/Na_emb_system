import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import Admin_dashboard from '../Admin_dashboard';

const ProtectedRoute = () => {
    const isAuthenticated = useAuth();
    console.log(isAuthenticated)

    return isAuthenticated ? <Admin_dashboard /> : <Navigate to="/login" />;
    
};

export default ProtectedRoute;
