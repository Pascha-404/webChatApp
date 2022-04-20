import React, { useState } from 'react';
import { Card, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
	useLayout,
	useLayoutDispatch,
	useUserChats,
	useUserChatsDispatch,
	useUser,
	useUserDispatch,
	useContactsDispatch,
	useFindContactsDispatch,
	useGroupChats,
} from '../../contexts';
import addDatabaseChat from '../../services/api/addDatabaseChat';

import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

function DataCard({ target, time, msg, chatId, cardType }) {
	const { chatBox } = useLayout();
	const isActive = chatId === chatBox.id;
	const classes = useStyles({ isActive });
	const user = useUser();
	const userDispatch = useUserDispatch();
	const userChats = useUserChats();
	const groupChats = useGroupChats();
	const contactsDispatch = useContactsDispatch();
	const { dataListTab, dataListContent } = useLayout();
	const findContactsDispatch = useFindContactsDispatch();
	const userChatsDispatch = useUserChatsDispatch();
	const layoutDispatch = useLayoutDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const isUserMsg = msg && Object.keys(msg)[0] === user.uuid ? true : false;

	async function handleClick() {
		if (cardType === 'userChat') {
			layoutDispatch({
				type: 'SET_CHATBOX',
				id: chatId,
				target: target.uuid,
				targetType: cardType,
			});
		} else if (cardType === 'contact') {
			if (dataListTab.contacts === 'findContacts') {
				contactsDispatch({ type: 'ADD_CONTACT', newContact: target });
				userDispatch({ type: 'ADD_CONTACT', newContact: target });
			}
			const checkChats = userChats.filter(chat => chat.members.includes(target.uuid));
			if (checkChats.length === 1) {
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: checkChats[0].chatId,
					target: target.uuid,
					targetType: 'userChat',
				});
				layoutDispatch({ type: 'SHOW_INBOX' });
			} else if (checkChats.length === 0) {
				const createdChat = await addDatabaseChat({
					user: user.uuid,
					target: target.uuid,
				});
				userChatsDispatch({ type: 'CREATE_CHAT', newChat: createdChat });
				layoutDispatch({ type: 'SHOW_INBOX' });
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: createdChat.chatId,
					target: target.uuid,
					targetType: 'userChat',
				});
			}
		} else if (cardType === 'groupChat') {
			layoutDispatch({
				type: 'SET_CHATBOX',
				id: chatId,
				target: target.uuid,
				targetType: cardType,
			});
			layoutDispatch({ type: 'SHOW_INBOX' });
		} else if (cardType === 'group') {
			if (dataListTab.groups === 'findGroups') {
				console.log('find groups');
			}
			const checkChats = groupChats.filter(chat => chat.chatId === target.chatId);
			if (checkChats.length === 1) {
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: checkChats[0].chatId,
					target: target.uuid,
					targetType: 'groupChat',
				});
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
							userChatsDispatch({
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
									targetType: '',
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
					<MenuItem
						onClick={e => {
							e.stopPropagation();
							contactsDispatch({ type: 'ADD_CONTACT', newContact: target });
							userDispatch({ type: 'ADD_CONTACT', newContact: target });
							findContactsDispatch({ type: 'DELETE_CONTACT', contactId: target.uuid });
						}}>
						Add to contacts
					</MenuItem>
				)}
			</Menu>
		</Card>
	);
}

export default DataCard;
