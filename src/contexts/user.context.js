import { createContext, useContext } from 'react';
import useDefaultUser from '../hooks/useDefaultUser';
import useChatReducer from '../hooks/useChatReducer';
import chatReducer from '../reducers/chat.reducer';
import useFetchDatabase from '../services/api/useFetchDatabase';
import fetchDatabase from '../utilities/fetchDatabase';
import Loading from '../components/Loading';

const UserContext = createContext();
const ChatContext = createContext();
const ChatDispatch = createContext();

function UserProvider({ children }) {
	const [fetchedUser, isFetching] = useFetchDatabase('/users/admin');
	const [chats, chatDispatch] = useChatReducer(chatReducer);

	return (
		<UserContext.Provider value={fetchedUser}>
			<ChatContext.Provider value={chats}>
				<ChatDispatch.Provider value={chatDispatch}>
					{!isFetching && children} {isFetching && <Loading />}
				</ChatDispatch.Provider>
			</ChatContext.Provider>
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
export { useUser, UserProvider, ChatDispatch };
