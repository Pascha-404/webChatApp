import { useReducer, useEffect } from 'react';
import { fetchDatabase } from '../services/api';

const useGroupChatReducer = (reducer, activeGroups, setIsFetching, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

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
				setIsFetching(false)
			})
			.catch(error => console.log(error));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, activeGroups]);

	return [state, dispatch];
};

export default useGroupChatReducer;
