import { createContext, useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';

import contactReducer from '../reducers/contact.reducer';
import useContactReducer from '../hooks/useContactReducer';
import fetchDatabase from '../services/api/fetchDatabase';
import { useLayout } from './layout.context';
import { useUser } from './user.context';

const ContactsContext = createContext();
const ContactsDispatch = createContext();
const FindContactsContext = createContext();

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

function useFindContacts() {
	const context = useContext(FindContactsContext);
	if (context === undefined) {
		throw new Error('useFindContacts must be used withing a ContactsProvider');
	}
	return context;
}

function ContactsProvider({ children }) {
	const { contacts, uuid } = useUser();
	const { dataListTab } = useLayout();
	const [foundContactsData, setFoundContactsData] = useState([]);
	const [contactsData, dispatch, isFetching] = useContactReducer(
		contactReducer,
		contacts,
		[]
	);

	useEffect(() => {
		if (dataListTab.contacts === 'findContacts') {
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
				setFoundContactsData(contactsArray);
			}
			findNewContacts(uuid);
		}
	}, [dataListTab.contacts, uuid]);

	return (
		<ContactsContext.Provider value={contactsData}>
			<ContactsDispatch.Provider value={dispatch}>
				<FindContactsContext.Provider value={foundContactsData}>
					{!isFetching ? children : <Loading />}
				</FindContactsContext.Provider>
			</ContactsDispatch.Provider>
		</ContactsContext.Provider>
	);
}

export { useContacts, useContactsDispatch, useFindContacts, ContactsProvider };
