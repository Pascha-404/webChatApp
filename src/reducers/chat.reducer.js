import { v4 as uuid } from 'uuid';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_STATE':
			return action.state;
		case 'DELETE_CHAT':
			return [state.filter(chat => action.chatId !== chat.chatId)];
		case 'CREATE_CHAT':
			return [
				...state,
				{
					chatId: uuid(),
					members: [action.userId, action.contactId],
					messages: [],
					chatCreated: Date.now(),
					lastMsgSend: Date.now(),
				},
			];
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
