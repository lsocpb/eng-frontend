import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/LoginForm/Login';
import ProtectedPage from './Protected';
import RoleNavbar from './Components/Navbar/RoleNavbar';
import Register from "./Components/Register/Register";
import HomePage from "./Components/HomePage/HomePage";
import Profile from "./Components/UserProfile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <Router>
            <RoleNavbar />
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={ <ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/protected" element={<ProtectedPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
