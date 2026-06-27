import { Navigate, Outlet } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredRoles, requiredPermissions }) => {
    const { user, loading, hasAnyRole, hasAnyPermission } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <ScaleLoader color="#0E2A47" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles && requiredRoles.length > 0) {
        if (!hasAnyRole(requiredRoles)) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
        if (!hasAnyPermission(requiredPermissions)) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
