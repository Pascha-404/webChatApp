import database from '../../firebase.config';
import { ref, push, update, child } from 'firebase/database';

function addDatabaseChat(paramsObj) {
	// Get a key for a new Post.
	const newChatKey = push(child(ref(database), '/userChats')).key;

	const chatData = {
		chatId: newChatKey,
		chatTimestamp: Date.now(),
		lastMsg: {},
		members: [paramsObj.user, paramsObj.target],
		msgTimestamp: null,
	};

	// Write the nmessage data simultaneously in the messages of the userChat list and the user's post list.
	const updates = {};
    updates[`/userChats/${newChatKey}`] = chatData;
    updates[`/users/${paramsObj.user}/userChats/${newChatKey}`] = true;
    updates[`/users/${paramsObj.target}/userChats/${newChatKey}`] = true;
	
	update(ref(database), updates);
	return chatData;
}

export default addDatabaseChat;
