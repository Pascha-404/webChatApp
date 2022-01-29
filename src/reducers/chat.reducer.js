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
		case 'ADD_MSG':
			const msg = {
				msg: action.msg,
				msgId: uuid(),
				timestamp: Date.now,
				userId: action.userId,
			};
			const chat = state.filter(chat => action.chatId === chat.chatId);
			chat.messages.push(msg);
			return [state.filter(chat => action.chatId !== chat.chatId), chat];

		default:
			return state;
	}
};

export default reducer;
