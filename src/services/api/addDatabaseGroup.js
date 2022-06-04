import { database } from '../../firebase.config';
import { ref, push, child } from 'firebase/database';
import updateDatabaseData from './updateDatabaseData';

function addDatabaseGroup({ userId, members, groupName }) {
	// Get a new key for a new Group and GroupChat.
	const newGroupKey = push(child(ref(database), '/groups')).key;
	const newGroupChatKey = push(child(ref(database), '/groupChats')).key;

	const groupData = {
		displayName: groupName,
		uuid: newGroupKey,
		chatId: newGroupChatKey,
		members: { [userId]: true },
		msgTimestamp: null,
		photoURL: false,
		isDeleted: false,
		isAdmin: [userId],
	};

	const groupChatData = {
		chatId: newGroupChatKey,
		chatTimestamp: Date.now(),
		lastMsg: false,
		msgTimestamp: false,
		members: { [userId]: true },
	};

	// Add new Group and GroupChat with Objects above to Database.
	// Add currently authenticated User (creator of group) to group.
	const updateArray = [
		{ path: `/groups/${newGroupKey}`, value: groupData },
		{ path: `/groupChats/${newGroupChatKey}`, value: groupChatData },
		{ path: `/users/${userId}/groups/${newGroupKey}`, value: true },
	];

	// Loop through every added member of group and add the userId to both objects. (group/groupChat)
	// Also add to updateArray for every member the group to user profile.
	for (let member of members) {
		groupData.members[member.uuid] = true;
		groupChatData.members[member.uuid] = true;
		updateArray.push({
			path: `/users/${member.uuid}/groups/${newGroupKey}`,
			value: true,
		});
	}

	// Update Database with all values of updateArray.
	updateDatabaseData(updateArray);
	return groupData;
}

export default addDatabaseGroup;
