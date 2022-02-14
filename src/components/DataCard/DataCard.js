import React, { useState } from 'react';
import { Card, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
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
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const targetName = target.firstName + ' ' + target.lastName;

	function handleClick() {
		if (type === 'chat') {
			layoutDispatch({ type: 'SET_CHATBOX', id: chatId, target: target.uuid });
		} else if (type === 'contact') {
			const checkChats = chats.filter(chat => chat.members.includes(target.uuid));
			if (checkChats.length === 1) {
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: checkChats[0].chatId,
					target: target.uuid,
				});
				layoutDispatch({type: 'SHOW_INBOX'})
			} else if (checkChats.length === 0) {
				chatsDispatch({ type: 'CREATE_CHAT', user: user.uuid, target: target.uuid });
				layoutDispatch({ type: 'SHOW_INBOX' });
			}
		}
	}

	function handleShowOptions(e) {
		e.stopPropagation();
		setAnchorEl(e.currentTarget);
	}

	function handleCloseOptions(e) {
		e.stopPropagation();
		setAnchorEl(null);
	}

	return (
		<Card className={classes.dataCard} onClick={handleClick}>
			<CardHeader
				avatar={<UserAvatar userName={targetName} imgUrl={target.pictureLink} />}
				title={targetName}
				subheader={msg && Object.values(msg)[0]}
				action={
					<IconButton onClick={handleShowOptions}>
						<ExpandMoreIcon />
					</IconButton>
				}
			/>
			<Menu open={open} anchorEl={anchorEl} onClose={handleCloseOptions}>
				<MenuItem
					onClick={e => {
						e.stopPropagation();
						chatsDispatch({
							type: 'DELETE_CHAT',
							user: user.uuid,
							chatPartner: target.uuid,
							chatId: chatId,
						});
						setAnchorEl(null)
					}}>
					Delete Chat
				</MenuItem>
			</Menu>
		</Card>
	);
}

export default DataCard;
