import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "../UserContext/UserContext";

const ProtectedRoute = ({ requiredRoles }) => {
    const { user } = useUser();

    if (user === undefined) {
        return null;
    }


    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
