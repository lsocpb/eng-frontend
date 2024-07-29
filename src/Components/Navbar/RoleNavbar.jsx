import React from 'react';
import AuthorizedNav from './AuthorizedNavbar';
import UnauthorizedNav from './UnAuthorizedNavbar';
import AdminNavbar from './AdminNavbar';
import { useUser } from '../UserContext/UserContext';

const RoleNavbar = () => {
    const { user } = useUser();

    if (!user) {
        return <UnauthorizedNav />;
    }

    if (user.role === 'admin') {
        return <AdminNavbar />;
    }

    return <AuthorizedNav />;
}

export default RoleNavbar;