import { useReducer, useEffect } from 'react';
import { firebaseAuth } from '../firebase.config';

const useAuthReducer = (reducer, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	useEffect(() => {
		async function checkIfSignedin() {
			await firebaseAuth.onAuthStateChanged(user => {
				if (user) {
					dispatch({ type: 'SET_STATE', state: { uuid: user.uid } });
				}
			});
		}
		checkIfSignedin();
	}, []);

	return [state, dispatch];
};

export default useAuthReducer;
