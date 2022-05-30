import React, { createContext, useContext, useEffect } from 'react';
import useAuthReducer from '../hooks/useAuthReducer';
import authReducer from '../reducers/auth.reducer.js';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from '../services/localStorage/useLocalStorage';
import {
	logInWithEmail,
	logInWithGoogle,
	logInWithGithub,
	registerAnonym,
	registerWithEmail,
	checkRedirectData,
} from '../firebase.config';

const AuthContext = createContext();
const AuthDispatch = createContext();

// Function to simplify the use of AuthContext in components.
function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

// Function to simplify the use of AuthDispatch in components.
function useAuthDispatch() {
	const dispatch = useContext(AuthDispatch);
	if (dispatch === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return dispatch;
}

/* 
Authentication Provider to handle context for the auth process and state.
Has a isRedirected state which is saved in localStorage to handle redirects from authProviders.
*/
function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [isRedirected, setIsRedirected] = useLocalStorage('webChat_redirect', false);
	const [auth, dispatch] = useAuthReducer(authReducer, {
		uuid: '',
		loginId: '',
		password: '',
		regAnonym: false,
		regEmail: false,
		authGoogle: false,
		authGithub: false,
		logInEmail: false,
		rememberMe: false,
		error: false,
		errorCode: '',
	});

	 /* 
	 uses checkRedirectData from firebase.config.js file. 
	 Checks after redirect the incoming userData.
	 If User exists in DB => just reset isRedirected value.
	 If user !exists in DB => create User in DB and reset isRedirected value. 
	 */
	useEffect(() => {
		checkRedirectData(setIsRedirected);
	}, [setIsRedirected]);

	// Checks if context has a uuid. If true => navigate to mainpage
	useEffect(() => {
		if (auth.uuid) {
			dispatch({ type: 'SET_STATE', state: { loading: false } });
			navigate('/');
		} else {
			console.log('NO USER');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.uuid]);

	/* 
	Listens for changes in state of auth methods.
	If true => executes the method with provided data from state to authenticate and resets the state.
	Methods are provided through firebase.config.js file.
	*/
	useEffect(() => {
		if (auth.regAnonym) {
			registerAnonym(auth.loginId, dispatch);
			dispatch({ type: 'SET_STATE', state: { regAnonym: false } });
		} else if (auth.regEmail) {
			registerWithEmail(auth.loginId, auth.password, auth.rememberMe, dispatch);
			dispatch({
				type: 'SET_STATE',
				state: { regEmail: false, password: '', error: false, errorCode: '' },
			});
		} else if (auth.authGoogle) {
			logInWithGoogle(dispatch);
			dispatch({ type: 'SET_STATE', state: { authGoogle: false } });
		} else if (auth.authGithub) {
			logInWithGithub(dispatch);
			dispatch({ type: 'SET_STATE', state: { authGithub: false } });
		} else if (auth.logInEmail) {
			logInWithEmail(auth.loginId, auth.password, auth.rememberMe, dispatch);
			dispatch({
				type: 'SET_STATE',
				state: { logInEmail: false, password: '', error: false, errorCode: '' },
			});
		}
	}, [auth, dispatch]);

	return (
		<AuthContext.Provider value={{ ...auth, isRedirected }}>
			<AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth, useAuthDispatch };
