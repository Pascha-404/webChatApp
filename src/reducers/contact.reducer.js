const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return [...action.state];
		case 'ADD_CONTACT':
			return [action.newContact, ...state];
		case 'DELETE_CONTACT':
			return state.filter(contact => contact.uuid !== action.contactId);
		default:
			return state;
	}
};

export default reducer;
