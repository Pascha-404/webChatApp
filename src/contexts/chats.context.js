import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import { useUser } from './user.context';
import useChatReducer from '../hooks/useChatReducer';
import chatReducer from '../reducers/chat.reducer';
import fetchDatabase from '../services/api/fetchDatabase';
import { useContacts, useContactsDispatch } from './contacts.context';

const ChatsContext = createContext();
const ChatsDispatch = createContext();

function useChats() {
	const context = useContext(ChatsContext);
	if (context === undefined) {
		throw new Error('useChats must be used within a ChatsProvider');
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
	const contacts = useContacts();
	const contactsDispatch = useContactsDispatch();
	const [chats, dispatch] = useChatReducer(chatReducer, user.userChats);
	const chatsRef = useRef(chats);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		setIsFetching(true);
		const fetchedChats = Object.keys(chatsRef.current).map(async chat => {
			const getChat = await fetchDatabase(`/userChats/${chat}`);
			return getChat;
		});
		Promise.all(fetchedChats)
			.then(results => {
				dispatch({ type: 'SET_STATE', state: results });
			})
			.catch(error => console.log(error));
	}, [dispatch]);

	useEffect(() => {
		async function getUnknownContactData(userChats) {
			setIsFetching(true);
			let chatPartner = userChats.map(chat => {
				const filteredUser = chat.members.filter(member => member !== user.uuid);
				return filteredUser[0];
			});
			for await (let partner of chatPartner) {
				const contactFilter = contacts.filter(contact => contact.uuid === partner);
				if (contactFilter.length <= 0) {
					const getUser = await fetchDatabase(`/users/${partner}`);
					const { displayName, photoURL, uuid } = getUser;
					contactsDispatch({
						type: 'ADD_CONTACT',
						newContact: { displayName, photoURL, uuid, isFriend: false },
					});
				}
			}
			setIsFetching(false);
		}
		if (typeof chats[0] === 'object') {
			getUnknownContactData(chats);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chats]);

	return (
		<ChatsContext.Provider value={chats}>
			<ChatsDispatch.Provider value={dispatch}>
				{!isFetching && children} {isFetching && <Loading />}
			</ChatsDispatch.Provider>
		</ChatsContext.Provider>
	);
}

export { ChatsProvider, useChats, useChatsDispatch };
