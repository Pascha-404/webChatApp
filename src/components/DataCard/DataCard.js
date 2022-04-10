import React, { useState } from 'react';
import { Card, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

import { useLayout, useLayoutDispatch } from '../../contexts/layout.context';
import { useChats, useChatsDispatch } from '../../contexts/chats.context';
import { useUser, useUserDispatch } from '../../contexts/user.context';
import addDatabaseChat from '../../services/api/addDatabaseChat';
import { useContactsDispatch } from '../../contexts/contacts.context';

function DataCard({ target, time, msg, chatId, type }) {
	const { chatBox } = useLayout();
	const isActive = chatId === chatBox.id;
	const classes = useStyles({ isActive });
	const user = useUser();
	const userDispatch = useUserDispatch();
	const chats = useChats();
	const contactsDispatch = useContactsDispatch();
	const { dataListTab, dataListContent } = useLayout();
	const chatsDispatch = useChatsDispatch();
	const layoutDispatch = useLayoutDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const isUserMsg = msg && Object.keys(msg)[0] === user.uuid ? true : false;

	async function handleClick() {
		if (type === 'chat') {
			layoutDispatch({ type: 'SET_CHATBOX', id: chatId, target: target.uuid });
		} else if (type === 'contact') {
			if (dataListTab.contacts === 'findContacts') {
				contactsDispatch({ type: 'ADD_CONTACT', newContact: target });
				userDispatch({ type: 'ADD_CONTACT', newContact: target });
			}
			const checkChats = chats.filter(chat => chat.members.includes(target.uuid));
			if (checkChats.length === 1) {
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: checkChats[0].chatId,
					target: target.uuid,
				});
				layoutDispatch({ type: 'SHOW_INBOX' });
			} else if (checkChats.length === 0) {
				const createdChat = await addDatabaseChat({
					user: user.uuid,
					target: target.uuid,
				});
				chatsDispatch({ type: 'CREATE_CHAT', newChat: createdChat });
				layoutDispatch({ type: 'SHOW_INBOX' });
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: createdChat.chatId,
					target: target.uuid,
				});
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
				avatar={<UserAvatar userName={target.displayName} imgUrl={target.photoURL} />}
				title={target.displayName}
				subheader={
					msg
						? isUserMsg
							? `\u27A5 ${Object.values(msg)[0]}`
							: Object.values(msg)[0]
						: null
				}
				action={
					<IconButton onClick={handleShowOptions}>
						<ExpandMoreIcon />
					</IconButton>
				}
			/>
			<Menu open={open} anchorEl={anchorEl} onClose={handleCloseOptions}>
				{dataListContent === 'inbox' && (
					<MenuItem
						onClick={e => {
							e.stopPropagation();
							chatsDispatch({
								type: 'DELETE_CHAT',
								user: user.uuid,
								chatPartner: target.uuid,
								chatId: chatId,
							});
							if (chatBox.id === chatId) {
								layoutDispatch({
									type: 'SET_CHATBOX',
									id: '',
									target: '',
								});
							}
							setAnchorEl(null);
						}}>
						Delete Chat
					</MenuItem>
				)}
				{dataListContent === 'contacts' && dataListTab.contacts === 'existingContacts' && (
					<MenuItem
						onClick={e => {
							e.stopPropagation();
							userDispatch({ type: 'DELETE_CONTACT', contactId: target.uuid });
							contactsDispatch({ type: 'DELETE_CONTACT', contactId: target.uuid });
						}}>
						Delete contact
					</MenuItem>
				)}
				{dataListContent === 'contacts' && dataListTab.contacts === 'findContacts' && (
					<MenuItem>Add to contacts</MenuItem>
				)}
			</Menu>
		</Card>
	);
}

export default DataCard;
