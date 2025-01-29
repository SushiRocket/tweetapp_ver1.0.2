// frontend/src/components/PrivateRoute.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;