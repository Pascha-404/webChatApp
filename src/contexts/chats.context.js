import { createContext, useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useUser } from './user.context';
import useChatReducer from '../hooks/useChatReducer';
import chatReducer from '../reducers/chat.reducer';
import fetchDatabase from '../utilities/fetchDatabase';

const ChatsContext = createContext();
const ChatsDispatch = createContext();

function ChatsProvider({ children }) {
	const user = useUser();
	const [chats, dispatch] = useChatReducer(chatReducer, user.userChats);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const fetchedChats = Object.keys(chats).map(async chat => {
	return await fetchDatabase(`/userChats/${chat}`);
			
		});
		Promise.all(fetchedChats)
			.then(results => console.log(results))
			.catch(error => console.log(error));
	}, []);

	return (
		<ChatsContext.Provider value={chats}>
			<ChatsDispatch.Provider value={dispatch}>
				{!isFetching && children} {isFetching && <Loading />}
			</ChatsDispatch.Provider>
		</ChatsContext.Provider>
	);
}

function useChatsContext() {
	const context = useContext(ChatsContext);
	if (context === undefined) {
		throw new Error('useChatsContext must be used within a ChatsProvider');
	}
	return context;
}

function useChatsDispatch() {
	const dispatch = useContext(ChatsDispatch);
	if (dispatch === undefined) {
		throw new Error('useChatsDispatch must be used within a ChatsProvider');
	}
	return dispatch;
}

export { ChatsProvider, useChatsContext, useChatsDispatch };
