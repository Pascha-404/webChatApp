import { useReducer } from 'react';

const useLayoutReducer = (reducer, defaultValue) => {
	const [state, dispatch] = useReducer(reducer, defaultValue);

	return [state, dispatch];
};

export default useLayoutReducer;
