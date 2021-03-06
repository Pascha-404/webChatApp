const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return { refresh: false, foundContacts: action.state };
		case 'DELETE_CONTACT':
			return {
				...state,
				foundContacts: state.foundContacts.filter(user => user.uuid !== action.contactId),
			};
		case 'TOGGLE_REFRESH':
			return { ...state, refresh: !state.refresh };
		default:
			return state;
	}
};

export default reducer;
