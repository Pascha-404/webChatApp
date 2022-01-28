import { createContext, useContext } from 'react';
import useDefaultUser from '../hooks/useDefaultUser';
import useChatReducer from '../hooks/useChatReducer';
import chatReducer from '../reducers/chat.reducer';
import useFetchDatabase from '../services/api/useFetchDatabase';
import fetchDatabase from '../utilities/fetchDatabase';
import Loading from '../components/Loading';

const UserContext = createContext();

function UserProvider({ children }) {
	const [fetchedUser, isFetching] = useFetchDatabase('/users/admin');

	return (
		<UserContext.Provider value={fetchedUser}>
			{!isFetching && children} {isFetching && <Loading />}
		</UserContext.Provider>
	);
}

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
export { useUser, UserProvider };
