import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserAvatar from '../UserAvatar';

import useStyles from './ChatBoxHeader.styles';
import { useLayoutContext } from '../../contexts/layout.context';

function ChatBoxHeader() {
	const { chatBox } = useLayoutContext();
	const classes = useStyles();
	return (
		<Card className={classes.chatBoxHeader}>
			<CardHeader
				className={classes.chatBoxData}
				avatar={
					<UserAvatar imgUrl={chatBox.target && chatBox.target.pictureLink} size={4} />
				}
				title={chatBox.target.name}
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
