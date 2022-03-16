import { useReducer, useEffect } from 'react';
import { database } from '../firebase.config';
import { ref, child, get } from 'firebase/database';
import writeDatabaseData from '../services/api/writeDatabaseData';

const useAuthReducer = (reducer, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

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
	}, [state]);

	return [state, dispatch];
};

export default useAuthReducer;
