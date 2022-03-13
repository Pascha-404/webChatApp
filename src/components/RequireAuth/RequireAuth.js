import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

function RequireAuth({ children }) {
	const auth = useAuth();
	const location = useLocation();

	if (!auth.user) {
		return <Navigate to='auth' state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuth;
