import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "../UserContext/UserContext";

/**
 * A component that protects routes based on user authentication and authorization.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} [props.requiredRoles] - An optional array of roles that are allowed to access the route. If not provided, any authenticated user can access.
 * @returns {React.Element|null} - Returns an `<Outlet />` if the user is authenticated and authorized,
 *                                  redirects to `/login` if the user is not authenticated,
 *                                  or redirects to `/home` if the user is authenticated but lacks the required role.
 *                                  Returns `null` while the user's authentication status is being determined.
 */
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
