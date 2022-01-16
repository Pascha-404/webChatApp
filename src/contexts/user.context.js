import { createContext } from 'react';
import useDefaultUser from '../hooks/useDefaultUser';

const UserContext = createContext();

function UserProvider({ children }) {
	const [defaultUser] = useDefaultUser();
	return <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
