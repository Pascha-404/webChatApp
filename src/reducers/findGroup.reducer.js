const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return { refresh: false, foundGroups: action.state };
		case 'DELETE_GROUP':
			return {
				...state,
				foundGroups: state.foundGroups.filter(group => group.uuid !== action.groupId),
			};
		case 'TOGGLE_REFRESH':
			return { ...state, refresh: !state.refresh };
		case 'ADD_GROUP':
			return { ...state, foundGroups: [...state.foundGroups, action.group] };
		default:
			return state;
	}
};

export default reducer;
