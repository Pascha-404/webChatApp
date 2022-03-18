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

	useEffect(() => {
		if (state.uuid) {
			function checkDbForUser() {
				const dbRef = ref(database);

				return get(child(dbRef, `/users/${state.uuid}`))
					.then(snap => {
						if (snap.exists()) {
							return null;
						} else {
							writeDatabaseData(`/users/${state.uuid}`, state);
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
			checkDbForUser();
		}
	}, [state.uuid]);

	return [state, dispatch];
};

export default useAuthReducer;
