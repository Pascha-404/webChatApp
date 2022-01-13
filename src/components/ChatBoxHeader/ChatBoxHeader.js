import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserAvatar from '../UserAvatar';

import useStyles from './ChatBoxHeader.styles';

function ChatBoxHeader() {
	const classes = useStyles();
	return (
		<Card className={classes.chatBoxHeader}>
			<CardHeader
				className={classes.chatBoxData}
				avatar={<UserAvatar size={4} />}
				title={'Ksenia Pavliuchik'}
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
