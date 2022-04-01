import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialVal) => {
	const [state, setState] = useState(() => {
		const saved = JSON.parse(localStorage.getItem(key));
		return saved || initialVal;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
};

export default useLocalStorage;
