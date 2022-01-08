import { useState } from 'react';

const useInputState = initialVal => {
	const [state, setState] = useState(initialVal);

	const handleChange = e => {
		setState(e.target.value);
	};

	const handleExplChange = (e, newValue) => {
		setState(newValue);
	};

	const reset = () => {
		setState('');
	};

	return { state, handleChange, reset, handleExplChange };
};

export default useInputState;
