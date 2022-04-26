const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return action.state;
		case 'LEAVE_GROUP':
			return state.filter(group => group.uuid !== action.groupId);
		default:
			return state;
	}
};

export default reducer
