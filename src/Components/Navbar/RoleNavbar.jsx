import React from 'react';
import AuthorizedNav from './AuthorizedNavbar';
import UnauthorizedNav from './UnAuthorizedNavbar';
import { useUser } from '../UserContext/UserContext';

/**
 * RoleNavbar component renders different navigation bars based on user authentication and role.
 *
 * - If no user is logged in, it renders `UnauthorizedNav`.
 * - If the user is logged in, it renders `AuthorizedNav`.
 */
const RoleNavbar = () => {
    const { user } = useUser();

    if (!user) {
        return <UnauthorizedNav />;
    }

    return <AuthorizedNav />;
}

export default RoleNavbar;