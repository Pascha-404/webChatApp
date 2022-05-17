import { updateDatabaseData } from '../services/api';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return action.state;
		case 'LEAVE_GROUP':
			return state.filter(group => group.uuid !== action.groupId);
		case 'JOIN_GROUP':
			return [action.newGroup, ...state];
		case 'DELETE_GROUP':
			updateDatabaseData([
				{ path: `/groups/${action.group.uuid}/isDeleted`, value: true },
			]);
			const filteredGroups = state.filter(group => group.uuid !== action.group.uuid);
			return [{ ...action.group, isDeleted: true }, ...filteredGroups];
		default:
			return state;
	}
};

export default reducer;
