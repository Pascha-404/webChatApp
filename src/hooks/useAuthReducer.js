import { useReducer } from 'react';

const useAuthReducer = (reducer, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	return [state, dispatch];
};

export default useAuthReducer;
