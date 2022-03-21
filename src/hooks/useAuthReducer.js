import { useReducer, useEffect } from 'react';
import { database, firebaseAuth } from '../firebase.config';
import { ref, child, get } from 'firebase/database';
import writeDatabaseData from '../services/api/writeDatabaseData';

const useAuthReducer = (reducer, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	useEffect(() => {
		async function checkIfSignedin() {
			await firebaseAuth.onAuthStateChanged(user => {
				if (user) {
					dispatch({ type: 'SET_STATE_KEY', key: 'uuid', state: user.uid });
				}
			});
		}
		checkIfSignedin();
	}, []);

	return [state, dispatch];
};

export default useAuthReducer;
