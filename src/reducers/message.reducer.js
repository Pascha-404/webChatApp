import addDatabaseMessage from '../services/api/addDatabaseMessage';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return action.payload;
		case 'ADD_MSG':
			const message = addDatabaseMessage({
				chatId: action.chatId,
				sentBy: action.userId,
				msg: action.msg,
			});
			return { ...state, message };
		default:
			return state;
	}
};

export default reducer;
