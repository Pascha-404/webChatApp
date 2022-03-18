import React, { createContext, useContext, useEffect } from 'react';
import useAuthReducer from '../hooks/useAuthReducer';
import authReducer from '../reducers/auth.reducer.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const AuthDispatch = createContext();

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}
function useAuthDispatch() {
	const dispatch = useContext(AuthDispatch);
	if (dispatch === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return dispatch;
}

function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [auth, dispatch] = useAuthReducer(authReducer, '');

	useEffect(() => {
		if (auth.uuid) {
			navigate('/');
		} else {
			console.log('NO USER');
		}
	}, []);

	return (
		<AuthContext.Provider value={auth}>
			<AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth, useAuthDispatch };
