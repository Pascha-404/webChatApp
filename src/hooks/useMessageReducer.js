import { useReducer, useEffect } from 'react';
import fetchDatabase from '../services/api/fetchDatabase';

const useMessageReducer = (reducer, chatBox, setIsFetching, initialVal) => {
	const [state, dispatch] = useReducer(reducer, initialVal);

	// Checks if chatBox is active(has chatId/changed chatId), fetches all messages for that chat and sets it as context state.
	useEffect(() => {
		let isActive = true;
		if (chatBox.id && isActive) {
			setIsFetching(true);
			fetchDatabase(`/messages/${chatBox.id}`)
				.then(data => {
					if (!data) {
						data = {};
					}
					dispatch({ type: 'SET_STATE', payload: data });
				})
				.catch(error => console.log(error));

			setIsFetching(false);
		}
		return () => {
			isActive = false;
		};
	}, [chatBox.id, dispatch]);

	return [state, dispatch];
};

export default useMessageReducer;
