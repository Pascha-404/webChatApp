import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import useChatReducer from '../hooks/useChatReducer';
import chatReducer from '../reducers/chat.reducer';
import fetchDatabase from '../services/api/fetchDatabase';
import { useContacts, useContactsDispatch, useUser } from './';

const UserChatsContext = createContext();
const UserChatsDispatch = createContext();
const GroupChatsContext = createContext();
const GroupChatsDispatch = createContext();

function useUserChats() {
	const context = useContext(UserChatsContext);
	if (context === undefined) {
		throw new Error('useUserChats must be used within a ChatsProvider');
	}
	return context;
}

function useUserChatsDispatch() {
	const dispatch = useContext(UserChatsDispatch);
	if (dispatch === undefined) {
		throw new Error('useUserChatsDispatch must be used within a ChatsProvider');
	}
	return dispatch;
}
function useGroupChats() {
	const context = useContext(GroupChatsContext);
	if (context === undefined) {
		throw new Error('useUserChats must be used within a ChatsProvider');
	}
	return context;
}

function useGroupChatsDispatch() {
	const dispatch = useContext(GroupChatsDispatch);
	if (dispatch === undefined) {
		throw new Error('useUserChatsDispatch must be used within a ChatsProvider');
	}
	return dispatch;
}

function ChatsProvider({ children }) {
	const user = useUser();
	const contacts = useContacts();
	const contactsDispatch = useContactsDispatch();
	const [userChats, userChatsDispatch] = useChatReducer(chatReducer, user.userChats);
	const chatsRef = useRef(userChats);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		setIsFetching(true);
		const fetchedChats = Object.keys(chatsRef.current).map(async chat => {
			const getChat = await fetchDatabase(`/userChats/${chat}`);
			return getChat;
		});
		Promise.all(fetchedChats)
			.then(results => {
				userChatsDispatch({ type: 'SET_STATE', state: results });
			})
			.catch(error => console.log(error));
	}, [userChatsDispatch]);

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
		if (typeof userChats[0] === 'object') {
			getUnknownContactData(userChats);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userChats]);

	return (
		<UserChatsContext.Provider value={userChats}>
			<UserChatsDispatch.Provider value={userChatsDispatch}>
				{!isFetching && children} {isFetching && <Loading />}
			</UserChatsDispatch.Provider>
		</UserChatsContext.Provider>
	);
}

export { ChatsProvider, useUserChats, useUserChatsDispatch, useGroupChats, useGroupChatsDispatch };
