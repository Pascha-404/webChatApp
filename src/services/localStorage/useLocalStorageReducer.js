import { useEffect, useReducer } from 'react';

const useLocalStorageReducer = (reducer, defaultValue, key) => {
	const [state, dispatch] = useReducer(reducer, defaultValue, () => {
		let value;
		try {
			value = JSON.parse(localStorage.getItem(key)) || defaultValue;
		} catch (error) {
			value = defaultValue;
			console.log(error);
		}
		return value;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [state, key]);

	return [state, dispatch];
};

export default useLocalStorageReducer;
