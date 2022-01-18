const reducer = (state, action) => {
	switch (action.type) {
		case 'SHOW_INBOX':
			return { ...state, dataListContent: 'inbox' };
		case 'SHOW_CONTACTS':
			return { ...state, dataListContent: 'contacts' };
		case 'SHOW_GROUPS':
			return { ...state, dataListContent: 'groups' };
		case 'SET_CHATBOX':
			return { ...state, chatBoxId: action.id };
		default:
			return state;
	}
};

export default reducer;
