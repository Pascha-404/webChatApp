import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const AuthDispatch = createContext();

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
	return context;
}
function useAuthDispatch() {
    const dispatch = useContext(AuthDispatch);
    if (dispatch === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }
	return dispatch;
}

function AuthProvider({ children }) {
	let [auth, setauth] = useState('');
	return (
		<AuthContext.Provider value={auth}>
			<AuthDispatch.Provider value="dispatch">{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth, useAuthDispatch };
