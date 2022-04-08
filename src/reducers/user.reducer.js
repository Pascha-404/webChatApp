const reducer = (state, action) => {
	switch (action.type) {
        case 'SET_STATE':
            return action.state;
        case 'ADD_CONTACT':
            return {...state, contacts: {...state.contacts, [action.newContact]: true}}
		default:
			return state;
	}
};

export default reducer
