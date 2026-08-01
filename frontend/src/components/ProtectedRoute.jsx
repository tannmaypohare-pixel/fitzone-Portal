import { Navigate } from "react-router-dom";


function ProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // No login
    if (!token) {

        return <Navigate to="/" replace />;

    }


    // Role check
    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {

        return <Navigate to="/unauthorized" replace />;

    }


    return children;

}


export default ProtectedRoute;