import { useReducer } from 'react';

const useChatReducer = (reducer, userChats) => {
	const [state, dispatch] = useReducer(reducer, userChats);

	return [state, dispatch];
};

export default useChatReducer;
