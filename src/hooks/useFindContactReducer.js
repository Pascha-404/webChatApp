import { useEffect, useReducer } from 'react';
import { fetchDatabase } from '../services/api';

const useFindContactReducer = (reducer, knownContacts, uuid, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	/* 
	findNewContacts first fetches all users from the database.
	Then it creates a contactObj from every user that is not the currently
	authenticated user and pushes it to the empty contactsArray.
	As next step the contactsArray gets filtered by contacts the user is already friends with.
	Finally the state is set.
	*/
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
	}, [state.refresh, knownContacts]);

	return [state, dispatch];
};

export default useFindContactReducer;
