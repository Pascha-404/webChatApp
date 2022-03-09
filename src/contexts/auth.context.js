import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const AuthDispatch = createContext();

function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
function useAuthDispatch() {
	const dispatch = useContext(AuthDispatch);
	return dispatch;
}

function AuthProvider({ children }) {
	let [user, setUser] = useState();
	return (
		<AuthContext.Provider value={user}>
			<AuthDispatch.Provider value="dispatch">{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth, useAuthDispatch };
