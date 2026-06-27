import { useAuth } from '../../context/AuthContext';

const Can = ({ permission, permissions, role, roles, children, fallback = null }) => {
    const { hasPermission, hasAnyPermission, hasRole, hasAnyRole } = useAuth();

    if (permission && hasPermission(permission)) {
        return children;
    }

    if (permissions && permissions.length > 0 && hasAnyPermission(permissions)) {
        return children;
    }

    if (role && hasRole(role)) {
        return children;
    }

    if (roles && roles.length > 0 && hasAnyRole(roles)) {
        return children;
    }

    return fallback;
};

export default Can;
