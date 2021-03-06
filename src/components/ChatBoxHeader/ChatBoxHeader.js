import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserAvatar from '../UserAvatar';

import useStyles from './ChatBoxHeader.styles';
import { useGroups, useContacts, useLayout } from '../../contexts';

/* 
Takes layout and user/group context. Checks in layout which type of chat is
active and returns the needed target to display it's values in the header.
*/
function pickContextData(layout, userContext, groupContext) {
	if (layout.targetType === 'userChat') {
		return userContext.filter(contact => layout.target === contact.uuid);
	} else if (layout.targetType === 'groupChat') {
		return groupContext.filter(group => layout.target === group.uuid);
	}
}

// Header Component for ChatBox
function ChatBoxHeader() {
	const { chatBox } = useLayout();
	const contacts = useContacts();
	const groups = useGroups();
	const classes = useStyles();
	const target = pickContextData(chatBox, contacts, groups);

	return (
		<Card className={classes.chatBoxHeader}>
			<CardHeader
				className={classes.chatBoxData}
				avatar={<UserAvatar photoURL={target[0].photoURL} size={4} />}
				title={target[0].displayName}
				subheader={'Offline ☉ Last Seen 3 Hours Ago'}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
			/>
		</Card>
	);
}

export default ChatBoxHeader;
