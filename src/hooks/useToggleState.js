import { useState } from 'react';

// Hook for handling boolean state toggle.
// useToggleState initialValue is by default false.
const useToggleState = (initialVal = false) => {
	const [state, setState] = useState(initialVal);

	// Toggles state
	const handleToggle = () => {
		setState(!state);
	};

	return [state, handleToggle];
};

export default useToggleState;
