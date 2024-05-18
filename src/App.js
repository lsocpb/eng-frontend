import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/LoginForm/Login';
import ProtectedPage from './Protected';
import RoleNavbar from './Components/Navbar/RoleNavbar';
import Register from "./Components/Register/Register";


function App() {

    return (
        <Router>
            <RoleNavbar/>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/protected" element={<ProtectedPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
