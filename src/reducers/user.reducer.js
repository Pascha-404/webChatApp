import { updateDatabaseData } from '../services/api';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return action.state;
		case 'ADD_CONTACT':
			updateDatabaseData([
				{ path: `/users/${state.uuid}/contacts/${action.newContact.uuid}`, value: true },
			]);
			return { ...state, contacts: { ...state.contacts, [action.newContact]: true } };
		case 'DELETE_CONTACT':
			updateDatabaseData([
				{ path: `/users/${state.uuid}/contacts/${action.contactId}`, value: false },
			]);
			return { ...state, contacts: { ...state.contacts, [action.contactId]: false } };
		case 'JOIN_GROUP':
			updateDatabaseData([
				{ path: `/users/${state.uuid}/groups/${action.groupId}`, value: true },
			]);
			return { ...state, groups: { ...state.groups, [action.groupId]: true } };
		case 'LEAVE_GROUP':
			updateDatabaseData([
				{ path: `/users/${state.uuid}/groups/${action.groupId}`, value: false },
			]);
			return { ...state, groups: { ...state.groups, [action.groupId]: false } };
		default:
			return state;
	}
};

export default reducer;
