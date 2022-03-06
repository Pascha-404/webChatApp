import { database } from '../../firebase.config';
import { ref, push, update, child } from 'firebase/database';

function addDatabaseMessage(paramsObj) {
	// Get a key for a new Post.
	const newMsgKey = push(child(ref(database), '/messages/' + paramsObj.chatId)).key;

	const messageData = {
		sentBy: paramsObj.sentBy,
		chatId: paramsObj.chatId,
		msg: paramsObj.msg,
		msgTimestamp: Date.now(),
		msgId: newMsgKey,
	};

	// Write the nmessage data simultaneously in the messages of the userChat list and the user's post list.
	const updates = {};
	updates[`/messages/${paramsObj.chatId}/${newMsgKey}`] = messageData;
	updates[`/userChats/${paramsObj.chatId}/msgTimestamp`] = messageData.msgTimestamp;
	updates[`/userChats/${paramsObj.chatId}/lastMsg`] = {
		[messageData.sentBy]: messageData.msg,
	};
	update(ref(database), updates);
	return { messageData, newMsgKey };
}

export default addDatabaseMessage;
