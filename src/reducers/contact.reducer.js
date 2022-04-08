const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return [...action.state];
		case 'ADD_CONTACT':
			return [action.newContact, ...state];
		default:
			return state;
	}
};

export default reducer;
