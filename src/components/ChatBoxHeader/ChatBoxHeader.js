import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserAvatar from '../UserAvatar';

import useStyles from './ChatBoxHeader.styles';
import { useLayout } from '../../contexts/layout.context';
import { useContacts } from '../../contexts/contacts.context';

function ChatBoxHeader() {
	const { chatBox } = useLayout();
	const contacts = useContacts();
	const classes = useStyles();
	const target = contacts.filter(contact => chatBox.target === contact.uuid);
	
	return (
		<Card className={classes.chatBoxHeader}>
			<CardHeader
				className={classes.chatBoxData}
				avatar={<UserAvatar imgUrl={target[0].pictureLink} size={4} />}
				title={target[0].firstName + ' ' + target[0].lastName}
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
