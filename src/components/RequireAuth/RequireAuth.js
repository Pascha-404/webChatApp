import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

/* 
Component to create protected Routes.
If there is no uuid in auth context (no authenticated user)
navigate back to AuthPage.
*/
function RequireAuth({ children }) {
	const auth = useAuth();
	const location = useLocation();

	if (!auth.uuid) {
		return <Navigate to='auth' state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuth;
