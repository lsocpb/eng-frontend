import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/LoginForm/Login';
import RoleNavbar from './Components/Navbar/RoleNavbar';
import Register from "./Components/Register/Register";
import HomePage from "./Components/HomePage/HomePage";
import Profile from "./Components/UserProfile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ViewAllCategories from "./Components/Category/ViewAllCategories";
import AddProductForm from "./Components/ProductComponent/AddProductForm";
import ProductPage from "./Components/ProductComponent/ProductView";
import CategoryPage from "./Components/Category/CategoryProduct";
import AdminPage from "./Components/AdminPage/AdminPage";
import { UserProvider } from './Components/UserContext/UserContext';
import ContactForm from './Components/ContactForm/ContactForm';
function App() {
    return (
        <Router>
            <UserProvider>
                <RoleNavbar />
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product/:productId/category/:categoryId" element={<ProductPage />} />
                    <Route path="/product/category/:categoryId" element={<CategoryPage />} />
                    <Route element={<ProtectedRoute requiredRoles={['user', 'admin']}/>}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin/category/all" element={<ViewAllCategories />} />
                        <Route path="/product/add" element={<AddProductForm />} />
                        <Route path="/contact" element={<ContactForm />} />
                    </Route>
                    <Route element={<ProtectedRoute requiredRoles={['admin']}/>}>
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Routes>
            </UserProvider>
        </Router>
    );
}

export default App;
