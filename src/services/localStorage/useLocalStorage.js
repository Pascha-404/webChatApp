import { useEffect, useState } from 'react';

// Needs a key under which the data is saved in localstorage and a initial value.
const useLocalStorage = (key, initialVal) => {
	const [state, setState] = useState(() => {
		// Checks if localstorage key already exists and sets that data as state.
		// If false uses initial value as state.
		const saved = JSON.parse(localStorage.getItem(key));
		return saved || initialVal;
	});

	// on change of key or state saves the current state in localstorage.
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
};

export default useLocalStorage;
