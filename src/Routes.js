import React from 'react';
import { AuthProvider } from './contexts/auth.context';
import { Routes, Route } from 'react-router';
import LoginPage from './components/LoginPage/LoginPage';
import WebChatApp from './components/WebChatApp';
import RequireAuth from './components/RequireAuth/RequireAuth';

function Routing() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path='/'
					element={
						<RequireAuth>
							<WebChatApp />
						</RequireAuth>
					}
				/>
				<Route path='login' element={<LoginPage />} />
			</Routes>
		</AuthProvider>
	);
}

export default Routing;
