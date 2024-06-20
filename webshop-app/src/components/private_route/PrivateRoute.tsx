import React from 'react';
import { Route, Routes, Navigate, RouteProps } from 'react-router-dom';
import UserService from '../../services/UserService';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
    roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        element={UserService.isAuthenticated() && roles.includes(UserService.getUserRole() || '') 
            ? <Component /> 
            : <Navigate to="/login" />}
    />
);

export default PrivateRoute;