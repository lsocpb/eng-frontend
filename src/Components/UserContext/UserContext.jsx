import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('active-user');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({
                username: decoded.sub,
                id: decoded.id,
                role: decoded.role
            });
            console.log(decoded);
        } else {
            setUser(null);
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem('active-user');
        setUser(null);
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
