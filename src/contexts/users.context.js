import React, { createContext } from 'react';
import useFetchData from '../services/useFetchData';

const UsersContext = createContext();

function UsersProvider({ children }) {
	const [fetchedUsers] = useFetchData('https://randomuser.me/api/?results=15');
	return <UsersContext.Provider value={fetchedUsers}>{children}</UsersContext.Provider>;
}

export { UsersContext, UsersProvider };
