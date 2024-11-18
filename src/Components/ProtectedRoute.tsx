import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    component: React.ComponentType; // Accepts any React component type
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const token = localStorage.getItem("token");

    // Log the token for debugging (remove in production)
    console.log("Token:", token);

    if (!token) {
        // Redirect to login if no token is found
        return <Navigate to="/login" replace />;
    }

    // Render the protected component
    return <Component />;
};

export default ProtectedRoute;
