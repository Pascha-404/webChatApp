import { database } from '../../firebase.config';
import { ref, update } from 'firebase/database';

// Sets for provided chatId all values to null.
// Database doesn't allow 'null' values, which deletes that entry.
function deleteDatabaseChat(paramsObj) {
	const updates = {};
	updates[`/userChats/${paramsObj.chatId}`] = null;
	updates[`/messages/${paramsObj.chatId}`] = null;
	updates[`/users/${paramsObj.user}/userChats/${paramsObj.chatId}`] = null;
	updates[`/users/${paramsObj.chatPartner}/userChats/${paramsObj.chatId}`] = null;
	update(ref(database), updates);
}

export default deleteDatabaseChat;
