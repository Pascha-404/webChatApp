import React from 'react';
import { AuthProvider } from './contexts/auth.context';
import { Routes, Route } from 'react-router';
import AuthPage from './components/AuthPage/AuthPage';
import WebChatApp from './components/WebChatApp';
import RequireAuth from './components/RequireAuth/RequireAuth';
import AuthForm from './components/AuthForm/AuthForm';

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
				<Route path='auth' element={<AuthPage />}>
					<Route index element={<AuthForm formState='authType' />} />
					<Route
						path='email'
						element={<AuthForm formState='authForm' authType='email' />}
					/>
					<Route
						path='email/register'
						element={<AuthForm formState='authForm' authType='regEmail' />}
					/>
					<Route
						path='anonym'
						element={<AuthForm formState='authForm' authType='authAnonym' />}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default Routing;
