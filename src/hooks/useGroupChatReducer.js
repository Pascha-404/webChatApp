import { useReducer, useEffect } from 'react';
import { fetchDatabase } from '../services/api';

const useGroupChatReducer = (reducer, activeGroups, setIsFetching, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	/* 
	Maps through activeGroups (groups user is a member of), to fetch the connected
	Chatroom. Adds for every chat a "type": "groupChat".
	After every groupChat was fetched resolves all Promises and sets the state.
	*/
	useEffect(() => {
		setIsFetching(true);
		const fetchedChats = activeGroups.map(async group => {
			const getChat = await fetchDatabase(`/groupChats/${group.chatId}`);
			const chatData = { ...getChat, type: 'groupChat' };
			return chatData;
		});
		Promise.all(fetchedChats)
			.then(results => {
				dispatch({ type: 'SET_STATE', state: results });
				setTimeout(() => {
					setIsFetching(false)
				}, 1000);
			})
			.catch(error => console.log(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, activeGroups]);

	return [state, dispatch];
};

export default useGroupChatReducer;
