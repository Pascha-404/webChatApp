import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

import { useLayoutDispatch } from '../../contexts/layout.context';
import { useChats, useChatsDispatch } from '../../contexts/chats.context';
import { useUser } from '../../contexts/user.context';

function DataCard({ target, time, msg, chatId, type }) {
	const classes = useStyles();
	const user = useUser();
	const chats = useChats();
	const chatsDispatch = useChatsDispatch();
	const layoutDispatch = useLayoutDispatch();
	const targetName = target.firstName + ' ' + target.lastName;

	function handleClick() {
		if (type === 'chat') {
			layoutDispatch({ type: 'SET_CHATBOX', id: chatId, target: target.uuid });
		} else if (type === 'contact') {
			const checkChats = chats.filter(chat => chat.members.includes(target.uuid));
			if (checkChats.length === 1) {
				layoutDispatch({ type: 'SET_CHATBOX', id: checkChats[0].chatId, target: target.uuid });
			} else if (checkChats.length === 0) {
				chatsDispatch({ type: 'CREATE_CHAT', user: user.uuid, target: target.uuid });
				
			}
		}
	}

	return (
		<Card className={classes.dataCard} onClick={handleClick}>
			<CardHeader
				avatar={<UserAvatar userName={targetName} imgUrl={target.pictureLink} />}
				title={targetName}
				subheader={msg && Object.values(msg)[0]}
				action={
					<IconButton>
						<ExpandMoreIcon />
					</IconButton>
				}
			/>
		</Card>
	);
}

export default DataCard;
