import { useReducer } from 'react';

const useMessageReducer = (reducer, initialVal) => {
	const [state, dispatch] = useReducer(reducer, initialVal);

	return [state, dispatch];
};

export default useMessageReducer;
