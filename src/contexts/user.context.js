import { createContext, useContext } from 'react';

import userReducer from '../reducers/user.reducer';
import useUserReducer from '../hooks/useUserReducer';
import { useAuth } from './auth.context';

import Loading from '../components/Loading';

const UserContext = createContext();
const UserDispatch = createContext();

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
function useUserDispatch() {
	const dispatch = useContext(UserDispatch);
	if (dispatch === undefined) {
		throw new Error('useUserDispatch must be used within a UserProvider');
	}
	return dispatch;
}

function UserProvider({ children }) {
	const { uuid } = useAuth();
	const [userData, dispatch, isFetching] = useUserReducer(userReducer, uuid, {});
	return (
		<UserContext.Provider value={userData}>
			<UserDispatch.Provider value={dispatch}>
				{!isFetching && children} {isFetching && <Loading />}
			</UserDispatch.Provider>
		</UserContext.Provider>
	);
}

export { useUser, useUserDispatch, UserProvider };
