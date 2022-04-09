const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return { refresh: false, foundContacts: action.state };
		case 'DELETE_CONTACT':
			return { ...state, contacts: state.filter(user => user.uuid !== action.userId) };
		case 'TOGGLE_REFRESH':
			return { refresh: !state.refresh, ...state };
		default:
			return state;
	}
};

export default reducer;
