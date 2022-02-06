import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import { useUser } from './user.context';
import useChatReducer from '../hooks/useChatReducer';
import chatReducer from '../reducers/chat.reducer';
import fetchDatabase from '../utilities/fetchDatabase';

const ChatsContext = createContext();
const ChatsDispatch = createContext();

function useChats() {
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

function ChatsProvider({ children }) {
	const user = useUser();
	const [chats, dispatch] = useChatReducer(chatReducer, user.userChats);
	const chatsRef = useRef(chats);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const fetchedChats = Object.keys(chatsRef.current).map(async chat => {
			const getChat = await fetchDatabase(`/userChats/${chat}`);
			return getChat;
		});
		Promise.all(fetchedChats)
			.then(results => {
				dispatch({ type: 'SET_STATE', state: results });
				setIsFetching(false);
			})
			.catch(error => console.log(error));
	}, [dispatch]);

	return (
		<ChatsContext.Provider value={chats}>
			<ChatsDispatch.Provider value={dispatch}>
				{!isFetching && children} {isFetching && <Loading />}
			</ChatsDispatch.Provider>
		</ChatsContext.Provider>
	);
}

export { ChatsProvider, useChats, useChatsDispatch };
