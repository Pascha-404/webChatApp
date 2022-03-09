import React, { createContext, useContext } from 'react';

const AuthContext = useContext();
const AuthDispatch = useContext();

function AuthProvider({ children }) {
	return (
		<AuthContext.Provider>
			<AuthDispatch.Provider>{children}</AuthDispatch.Provider>
		</AuthContext.Provider>
	);
}

export default AuthProvider;
