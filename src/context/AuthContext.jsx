import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await authService.getUser();
            const { user: userData, roles: userRoles, permissions: userPermissions } = response.data;
            setUser(userData);
            setRoles(userRoles || []);
            setPermissions(userPermissions || []);
        } catch (err) {
            console.error('Auth check failed:', err);
            clearAuthState();
        } finally {
            setLoading(false);
        }
    };

    const updateAuthState = (data) => {
        localStorage.setItem('access_token', data.access_token);
        setUser(data.user);
        const roleNames = data.user?.roles?.map(r => r.name) || [];
        setRoles(roleNames);
        authService.getUser().then(res => {
            setPermissions(res.data.permissions || []);
        }).catch(() => {});
    };

    const clearAuthState = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        setRoles([]);
        setPermissions([]);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            clearAuthState();
        }
    };

    const hasRole = (role) => roles.includes(role);

    const hasPermission = (permission) => permissions.includes(permission);

    const hasAnyRole = (roleList) => roleList.some(r => roles.includes(r));

    const hasAnyPermission = (permissionList) => permissionList.some(p => permissions.includes(p));

    return (
        <AuthContext.Provider value={{
            user,
            roles,
            permissions,
            loading,
            updateAuthState,
            checkAuth,
            clearAuthState,
            logout,
            hasRole,
            hasPermission,
            hasAnyRole,
            hasAnyPermission,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
