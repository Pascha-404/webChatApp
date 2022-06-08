import { useState } from 'react';

// Hook for working with input changes.
const useInputState = initialVal => {
	const [state, setState] = useState(initialVal);

	// Sets state to value of targeted/clicked input.
	const handleChange = e => {
		setState(e.target.value);
	};

	// Sets state to value explicit for second passed property.
	// Some MUI components use this property pattern.
	const handleExplChange = (e, newValue) => {
		setState(newValue);
	};

	// Adds to current state the passed value.
	const handleAddToState = value => {
		setState(state + value);
	};

	// Resets the state to a empty string.
	const reset = () => {
		setState('');
	};

	return { state, handleChange, reset, handleExplChange, handleAddToState };
};

export default useInputState;
