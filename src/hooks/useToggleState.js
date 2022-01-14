import { useState } from 'react';

const useToggleState = (initialVal = false) => {
	const [state, setState] = useState(initialVal);

	const handleToggle = () => {
		setState(!state);
	};

	return [state, handleToggle];
};

export default useToggleState;
