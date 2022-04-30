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
	useGroupsDispatch,
	useFindGroupsDispatch,
	useGroupChatsDispatch,
} from '../../contexts';
import { addDatabaseChat } from '../../services/api';

import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

function DataCard({ target, msg, chatId, cardType }) {
	const { chatBox } = useLayout();
	const isActive = chatId === chatBox.id;
	const classes = useStyles({ isActive });
	const user = useUser();
	const userDispatch = useUserDispatch();
	const userChats = useUserChats();
	const groupsDispatch = useGroupsDispatch();
	const findGroupsDispatch = useFindGroupsDispatch();
	const groupChats = useGroupChats();
	const groupChatsDispatch = useGroupChatsDispatch();
	const contactsDispatch = useContactsDispatch();
	const { dataListTab, dataListContent } = useLayout();
	const findContactsDispatch = useFindContactsDispatch();
	const userChatsDispatch = useUserChatsDispatch();
	const layoutDispatch = useLayoutDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const isUserMsg = msg && Object.keys(msg)[0] === user.uuid ? true : false;
	const isGroupChat = dataListContent === 'inbox' && cardType === 'groupChat';
	const isUserChat = dataListContent === 'inbox' && cardType === 'userChat';

	const handleCardClick = cardType => () => {
		switch (cardType) {
			case 'userChat':
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: chatId,
					target: target.uuid,
					targetType: cardType,
				});
				break;
			case 'contact':
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
					const createdChat = addDatabaseChat({
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
				break;
			case 'groupChat':
				layoutDispatch({
					type: 'SET_CHATBOX',
					id: chatId,
					target: target.uuid,
					targetType: cardType,
				});
				layoutDispatch({ type: 'SHOW_INBOX' });
				break;
			case 'group':
				if (dataListTab.groups === 'findGroups') {
					console.log('find groups');
				}
				const checkGroupChats = groupChats.filter(chat => chat.chatId === target.chatId);
				if (checkGroupChats.length === 1) {
					layoutDispatch({
						type: 'SET_CHATBOX',
						id: checkGroupChats[0].chatId,
						target: target.uuid,
						targetType: 'groupChat',
					});
					layoutDispatch({ type: 'SHOW_INBOX' });
				}
				break;
			default:
				throw new Error('No switch case for provided cardType');
		}
	};

	const handleMenuClick = type => e => {
		e.stopPropagation();
		switch (type) {
			case 'DELETE_CHAT':
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
				break;
			case 'DELETE_CONTACT':
				userDispatch({ type: 'DELETE_CONTACT', contactId: target.uuid });
				contactsDispatch({ type: 'DELETE_CONTACT', contactId: target.uuid });
				break;
			case 'ADD_CONTACT':
				contactsDispatch({ type: 'ADD_CONTACT', newContact: target });
				userDispatch({ type: 'ADD_CONTACT', contactId: target.uuid });
				findContactsDispatch({ type: 'DELETE_CONTACT', contactId: target.uuid });
				break;
			case 'LEAVE_GROUP':
				userDispatch({ type: 'LEAVE_GROUP', groupId: target.uuid });
				groupsDispatch({ type: 'LEAVE_GROUP', groupId: target.uuid });
				findGroupsDispatch({ type: 'ADD_GROUP', group: target });
				groupChatsDispatch({ type: 'LEAVE_CHAT', chatId: target.chatId });
				if (chatBox.id === chatId) {
					layoutDispatch({
						type: 'SET_CHATBOX',
						id: '',
						target: '',
						targetType: '',
					});
				}
				break;
			case 'JOIN_GROUP':
				userDispatch({ type: 'JOIN_GROUP', groupId: target.uuid });
				groupsDispatch({ type: 'JOIN_GROUP', newGroup: target });
				findGroupsDispatch({ type: 'DELETE_GROUP', groupId: target.uuid });

				break;
			default:
				throw new Error('Unknown Switch Type');
		}
	};

	function handleShowOptions(e) {
		e.stopPropagation();
		setAnchorEl(e.currentTarget);
	}

	function handleCloseOptions(e) {
		e.stopPropagation();
		setAnchorEl(null);
	}

	return (
		<Card className={classes.dataCard} onClick={handleCardClick(cardType)}>
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
				{isUserChat && (
					<MenuItem onClick={handleMenuClick('DELETE_CHAT')}>Delete Chat</MenuItem>
				)}

				{dataListContent === 'contacts' &&
					dataListTab.contacts === 'existingContacts' && (
						<MenuItem onClick={handleMenuClick('DELETE_CONTACT')}>
							Delete contact
						</MenuItem>
					)}

				{dataListContent === 'contacts' && dataListTab.contacts === 'findContacts' && (
					<MenuItem onClick={handleMenuClick('ADD_CONTACT')}>Add to contacts</MenuItem>
				)}

				{(isGroupChat ||
					(dataListContent === 'groups' && dataListTab.groups === 'existingGroups')) && (
					<MenuItem onClick={handleMenuClick('LEAVE_GROUP')}>Leave Group</MenuItem>
				)}

				{dataListContent === 'groups' && dataListTab.groups === 'findGroups' && (
					<MenuItem onClick={handleMenuClick('JOIN_GROUP')}>Join Group</MenuItem>
				)}
			</Menu>
		</Card>
	);
}

export default DataCard;
