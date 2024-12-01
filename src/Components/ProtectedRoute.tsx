import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    component: React.ComponentType;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const token = localStorage.getItem("token");



    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Component />;
};

export default ProtectedRoute;
