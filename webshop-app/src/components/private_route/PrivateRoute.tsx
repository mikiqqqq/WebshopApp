import React from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../../services/UserService';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    roles: string[];
    authPath?: string;
    redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, roles, authPath = '/login', redirectPath = '/unauthorized' }) => {
    const isAuthenticated = UserService.isAuthenticated();
    const userRole = UserService.getUserRole();

    if (!isAuthenticated) {
        // Redirect to authentication path if not authenticated
        return <Navigate to={authPath} replace />;
    }

    if (roles.length && !roles.includes(userRole || '')) {
        // Redirect to custom path if role is not authorized
        return <Navigate to={redirectPath} replace />;
    }

    // Render the component if authenticated and authorized
    return <Component />;
};

export default PrivateRoute;