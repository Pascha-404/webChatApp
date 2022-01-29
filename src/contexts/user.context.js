import { createContext, useContext } from 'react';
import useFetchDatabase from '../services/api/useFetchDatabase';
import Loading from '../components/Loading';

const UserContext = createContext();

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

function UserProvider({ children }) {
	const [fetchedUser, isFetching] = useFetchDatabase('/users/admin');

	return (
		<UserContext.Provider value={fetchedUser}>
			{!isFetching && children} {isFetching && <Loading />}
		</UserContext.Provider>
	);
}

export { useUser, UserProvider };
