import { useReducer, useEffect } from 'react';
import { fetchDatabase } from '../services/api';

const useUserChatReducer = (reducer, userChats, setIsFetching) => {
	const [state, dispatch] = useReducer(reducer, userChats);

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
	}, [dispatch]);

	return [state, dispatch];
};

export default useUserChatReducer;
