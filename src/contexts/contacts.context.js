import { createContext, useContext } from 'react';
import Loading from '../components/Loading';

import contactReducer from '../reducers/contact.reducer';
import findContactReducer from '../reducers/findContact.reducer';
import useContactReducer from '../hooks/useContactReducer';
import { useUser } from './user.context';
import useFindContactReducer from '../hooks/useFindContactReducer';

const ContactsContext = createContext();
const ContactsDispatch = createContext();
const FindContactsContext = createContext();
const FindContactsDispatch = createContext();

// Function to simplify the use of ContactsContext in components.
function useContacts() {
	const context = useContext(ContactsContext);
	if (context === undefined) {
		throw new Error('useContacts must be used within a ContactsProvider');
	}
	return context;
}

// Function to simplify the use of ContactsDispatch in components.
function useContactsDispatch() {
	const dispatch = useContext(ContactsDispatch);
	if (dispatch === undefined) {
		throw new Error('useContactsDispatch must be used within a ContactsProvider');
	}
	return dispatch;
}

// Function to simplify the use of FindContactsContext in components.
function useFindContacts() {
	const context = useContext(FindContactsContext);
	if (context === undefined) {
		throw new Error('useFindContacts must be used withing a ContactsProvider');
	}
	return context;
}

// Function to simplify the use of FindContactsDispatch in components.
function useFindContactsDispatch() {
	const dispatch = useContext(FindContactsDispatch);
	if (dispatch === undefined) {
		throw new Error('useFindContactsDispatch must be used withing a ContactsProvider');
	}
	return dispatch;
}

/* 
Contacts Provider to handle Context for Contacts and finding Contacts/Users.
Fetches contactsData based on the provided information through userContext.
foundContactsData fetches a list of all Users, excluding already known Contacts.
*/
function ContactsProvider({ children }) {
	const { contacts, uuid } = useUser();
	const [contactsData, dispatch, isFetching] = useContactReducer(
		contactReducer,
		contacts,
		[]
	);
	const [foundContactsData, foundContactsDispatch] = useFindContactReducer(
		findContactReducer,
		contactsData,
		uuid,
		{ refresh: false, foundContacts: [] }
	);

	return (
		<ContactsContext.Provider value={contactsData}>
			<ContactsDispatch.Provider value={dispatch}>
				<FindContactsContext.Provider value={foundContactsData}>
					<FindContactsDispatch.Provider value={foundContactsDispatch}>
						{!isFetching ? children : <Loading />}
					</FindContactsDispatch.Provider>
				</FindContactsContext.Provider>
			</ContactsDispatch.Provider>
		</ContactsContext.Provider>
	);
}

export {
	useContacts,
	useContactsDispatch,
	useFindContacts,
	useFindContactsDispatch,
	ContactsProvider,
};
