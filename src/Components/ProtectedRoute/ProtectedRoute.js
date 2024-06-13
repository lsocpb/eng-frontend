import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const token = sessionStorage.getItem('active-user');
    let auth = {token: token};
    return auth.token ? <Outlet/> : <Navigate to="/home"/>;
}