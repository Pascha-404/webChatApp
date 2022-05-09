import { database } from '../../firebase.config';
import { ref, push, child } from 'firebase/database';
import updateDatabaseData from './updateDatabaseData';

function addDatabaseGroup({ userId, members, groupName }) {
	// Get a key for a new Group and GroupChat.
	const newGroupKey = push(child(ref(database), '/groups')).key;
	const newGroupChatKey = push(child(ref(database), '/groupChats')).key;

	const groupData = {
		displayName: groupName,
		uuid: newGroupKey,
		chatId: newGroupChatKey,
		members: { [userId]: true },
		msgTimestamp: null,
	};

	const groupChatData = {
		chatId: newGroupChatKey,
		chatTimestamp: Date.now(),
		lastMsg: false,
		msgTimestamp: false,
		members: { [userId]: true },
	};

	const updateArray = [
		{ path: `/groups/${newGroupKey}`, value: groupData },
		{ path: `/groupChats/${newGroupChatKey}`, value: groupChatData },
		{ path: `/users/${userId}/groups/${newGroupKey}`, value: true },
	];

	for (let member of members) {
		groupData.members[member.uuid] = true;
		groupChatData.members[member.uuid] = true;
		updateArray.push({
			path: `/users/${member.uuid}/groups/${newGroupKey}`,
			value: true,
		});
	}


	updateDatabaseData(updateArray)
	return groupData;
}

export default addDatabaseGroup;
