import React, { createContext, useContext, useEffect } from 'react';
import useAuthReducer from '../hooks/useAuthReducer';
import authReducer from '../reducers/auth.reducer.js';
import { useNavigate } from 'react-router-dom';
import {
	logInWithEmail,
	logInWithGoogle,
	registerAnonym,
	registerWithEmail,
	setPersistenceLocal,
	setPersistenceSession,
} from '../firebase.config';

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
	const [auth, dispatch] = useAuthReducer(authReducer, {
		uuid: '',
		loginId: '',
		password: '',
		regAnonym: false,
		regEmail: false,
		authGoogle: false,
		logInEmail: false,
		rememberMe: false,
		error: false,
		errorCode: '',
	});

	useEffect(() => {
		if (auth.uuid) {
			navigate('/');
		} else {
			console.log('NO USER');
		}
	}, [auth.uuid]);

	useEffect(() => {
		if (auth.regAnonym) {
			registerAnonym(auth.loginId);
			dispatch({ type: 'SET_STATE', state: { regAnonym: false } });
		} else if (auth.regEmail) {
			registerWithEmail(auth.loginId, auth.password, auth.rememberMe, dispatch);
			dispatch({ type: 'SET_STATE', state: { regEmail: false, password: '' } });
		} else if (auth.authGoogle) {
			logInWithGoogle();
			dispatch({ type: 'SET_STATE', state: { authGoogle: false } });
		} else if (auth.logInEmail) {
			logInWithEmail(auth.loginId, auth.password, auth.rememberMe, dispatch);
			dispatch({ type: 'SET_STATE', state: { logInEmail: false } });
		}
	}, [auth]);

	return (
		<AuthContext.Provider value={auth}>
			<AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth, useAuthDispatch };
