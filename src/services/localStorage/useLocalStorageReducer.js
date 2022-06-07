import { useEffect, useReducer } from 'react';

/* 
Reducer method of using localstorage.
Needs a key under which the data is saved in localstorage and a default value.
Checks if localstorage key already exists and sets that data as state.
If false uses default value as state.
*/
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

	// On change of key or state saves the current state in localstorage.
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [state, key]);

	return [state, dispatch];
};

export default useLocalStorageReducer;
