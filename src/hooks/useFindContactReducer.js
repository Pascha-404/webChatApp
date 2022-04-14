import { useEffect, useReducer } from 'react';
import { fetchDatabase } from '../services/api';

const useFindContactReducer = (reducer, knownContacts, uuid, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	useEffect(() => {
		async function findNewContacts(currentUserId) {
			let contactsArray = [];
			const fetchedContacts = await fetchDatabase('/users');
			for (let contact in fetchedContacts) {
				if (fetchedContacts[contact].uuid !== currentUserId) {
					const { displayName, photoURL, uuid } = fetchedContacts[contact];
					const contactObj = { displayName, photoURL, uuid };
					contactsArray.push(contactObj);
				}
			}
			const filteredContacts = contactsArray.filter(user => {
				for (let contact of knownContacts) {
					if (
						contact.uuid === undefined ||
						(contact.uuid === user.uuid && contact.isFriend === true)
					) {
						return false;
					}
				}
				return true;
			});
			dispatch({ type: 'SET_STATE', state: filteredContacts });
		}
		findNewContacts(uuid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.refresh]);

	return [state, dispatch];
};

export default useFindContactReducer;
