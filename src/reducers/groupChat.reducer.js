import addDatabaseChat from '../services/api/addDatabaseChat';
import deleteDatabaseChat from '../services/api/deleteDatabaseChat';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return action.state;
		case 'DELETE_CHAT':
			deleteDatabaseChat({
				chatId: action.chatId,
				user: action.user,
				chatPartner: action.chatPartner,
			});
			return state.filter(chat => action.chatId !== chat.chatId);
		case 'CREATE_CHAT':
			return [action.newChat, ...state];

		case 'UPDATE_CHAT':
			const updatedChat = state.filter(chat => action.chatId === chat.chatId);
			updatedChat[0].lastMsg = { [action.sentBy]: action.msg };
			updatedChat[0].msgTimestamp = Date.now();

			const otherChats = state.filter(chat => action.chatId !== chat.chatId);

			return [...updatedChat, ...otherChats];

		default:
			return state;
	}
};

export default reducer;
