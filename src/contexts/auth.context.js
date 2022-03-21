import React, { createContext, useContext, useEffect } from 'react';
import useAuthReducer from '../hooks/useAuthReducer';
import authReducer from '../reducers/auth.reducer.js';
import { useNavigate } from 'react-router-dom';
import { registerAnonym, registerWithEmail } from '../firebase.config';

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
	});

	useEffect(() => {
		if (auth.uuid) {
			navigate('/');
		} else {
			console.log('NO USER');
		}
	}, [auth.uuid]);

	useEffect(() => {
		if (auth.regAnonym === true) {
			registerAnonym(auth.loginId)
			dispatch({type: 'SET_STATE_KEY', key: 'regAnonym', state: false})
		} else if (auth.regEmail === true) {
			registerWithEmail(auth.loginId, auth.password)
			dispatch({type: 'SET_STATE_KEY', key: 'regEmail', state: false})
			dispatch({type: 'SET_STATE_KEY', key: 'password', state: ''})
		}
	}, [auth]);

	return (
		<AuthContext.Provider value={auth}>
			<AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth, useAuthDispatch };
