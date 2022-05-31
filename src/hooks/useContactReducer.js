import { useEffect, useReducer, useState } from 'react';
import fetchDatabase from '../services/api/fetchDatabase';

const useContactReducer = (reducer, userContacts, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	const [isFetching, setIsFetching] = useState(true);

	/* 
	Filters provided userContacts(Object with userId's as keys and boolean value) where value = true (is friend).
	Then fetch contact, create contactObj with fetchedData and add "isFriend" key with "true" boolean. 
	Resolve finally all promises and set newly created array of contactObjects as state.
	*/
	useEffect(() => {
		setIsFetching(true);
		const activeContacts = Object.keys(userContacts).filter(
			key => userContacts[key] === true
		);
		const fetchedData = activeContacts.map(contact => {
			return fetchDatabase(`/users/${contact}`)
				.then(data => {
					const contactObj = {
						displayName: data.displayName,
						uuid: data.uuid,
						photoURL: data.photoURL,
						isFriend: true,
					};
					return contactObj;
				})
				.catch(error => console.log(error));
		});
		Promise.all(fetchedData).then(data => dispatch({ type: 'SET_STATE', state: data }));
		setIsFetching(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userContacts]);

	return [state, dispatch, isFetching];
};

export default useContactReducer;
