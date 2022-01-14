import { useState } from 'react';

const useInputState = initialVal => {
	const [state, setState] = useState(initialVal);

	const handleChange = e => {
		setState(e.target.value);
	};

	const handleExplChange = (e, newValue) => {
		setState(newValue);
	};

	const handleAddToState = value => {
		setState(state + value);
	};

	const reset = () => {
		setState('');
	};

	return { state, handleChange, reset, handleExplChange, handleAddToState };
};

export default useInputState;
