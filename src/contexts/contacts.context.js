import { createContext, useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';

import fetchDatabase from '../services/api/fetchDatabase';
import { useUser } from './user.context';

const ContactsContext = createContext();
const ContactsDispatch = createContext();

function useContacts() {
	const context = useContext(ContactsContext);
	if (context === undefined) {
		throw new Error('useContacts must be used within a ContactsProvider');
	}
	return context;
}

function useContactsDispatch() {
	const dispatch = useContext(ContactsDispatch);
	if (dispatch === undefined) {
		throw new Error('useContactsDispatch must be used within a ContactsProvider');
	}
	return dispatch;
}

function ContactsProvider({ children }) {
	const { contacts } = useUser();
	const [contactsData, setContactsData] = useState();
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		setIsFetching(true);
		const activeContacts = Object.keys(contacts).filter(key => contacts[key] === true);
		const fetchedData = activeContacts.map(contact => {
			return fetchDatabase(`/users/${contact}`)
				.then(data => {
					const contactObj = {
						firstName: data.firstName,
						lastName: data.lastName,
						nickname: data.nickname,
						uuid: data.uuid,
						pictureLink: data.pictureLink,
					};
					return contactObj;
				})
				.catch(error => console.log(error));
		});
		Promise.all(fetchedData).then(data => setContactsData(data));
		setIsFetching(false);
	}, [contacts]);

	return (
		<ContactsContext.Provider value={contactsData}>
			{!isFetching ? children : <Loading />}
		</ContactsContext.Provider>
	);
}

export { useContacts, useContactsDispatch, ContactsProvider };
