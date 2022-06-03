import { database } from '../../firebase.config';
import { ref, push, update, child } from 'firebase/database';

function addDatabaseChat(paramsObj) {
	// Get a key for a new Chat.
	const newChatKey = push(child(ref(database), '/userChats')).key;

	const chatData = {
		chatId: newChatKey,
		chatTimestamp: Date.now(),
		lastMsg: {},
		members: [paramsObj.user, paramsObj.target],
		msgTimestamp: null,
	};

	// Create a newChat in the Database with chatData.
	// Add chatId to both chat participants (user and target) profile with a value of true.
	const updates = {};
	updates[`/userChats/${newChatKey}`] = chatData;
	updates[`/users/${paramsObj.user}/userChats/${newChatKey}`] = true;
	updates[`/users/${paramsObj.target}/userChats/${newChatKey}`] = true;

	update(ref(database), updates);
	return chatData;
}

export default addDatabaseChat;
