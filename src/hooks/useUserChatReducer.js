import { useReducer, useEffect } from 'react';
import { fetchDatabase } from '../services/api';

const useUserChatReducer = (reducer, userChats, setIsFetching) => {
	const [state, dispatch] = useReducer(reducer, userChats);

	/* 
	Maps through userChats, to fetch the connected Chatroom. 
	Adds for every chat a "type": "userChat".
	After every userChat was fetched resolves all Promises and sets the state.
	*/
	useEffect(() => {
		setIsFetching(true);
		const fetchedChats = Object.keys(userChats).map(async chat => {
			const getChat = await fetchDatabase(`/userChats/${chat}`);
			const chatData = { ...getChat, type: 'userChat' };
			return chatData;
		});
		Promise.all(fetchedChats)
			.then(results => {
				dispatch({ type: 'SET_STATE', state: results });
			})
			.catch(error => console.log(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return [state, dispatch];
};

export default useUserChatReducer;
