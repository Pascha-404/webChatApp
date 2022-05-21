import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';
import ChatBoxHeader from '../ChatBoxHeader/ChatBoxHeader';
import ChatBubble from '../ChatBubble/ChatBubble';

import { formatISO9075 } from 'date-fns';
import useScrollIntoView from '../../hooks/useScrollIntoView';
import { useUser, useLayout, useMessages, useGroups } from '../../contexts';

import useStyles from './ChatBox.style';

/* 
ChatBox component in the rigth third of main page.
Contains ChatBoxHeader, ChatBoxBubbles and ChatBoxInput. 
*/
function ChatBox() {
	const { chatBox } = useLayout();
	const classes = useStyles();
	const { uuid } = useUser();
	const messages = useMessages();
	const groups = useGroups();
	// scroll on render last message into view
	const [scrollTargetRef] = useScrollIntoView('instant');
	const [generatedContent, setGeneratedContent] = useState();
	const [isDeletedGroup, setIsDeletedGroup] = useState(false);

	/* 
	Checks if messages in the message context for the provided chatRoom.
	If true sort them by timestamp, generate a ChatBubble for each message
	and set generatedContent. If not leave generatedContent empty.
	*/
	useEffect(() => {
		if (messages !== null) {
			const msgBubbles = Object.keys(messages)
				.sort((x, y) => messages[x].msgTimestamp - messages[y].msgTimestamp)
				.map(msgObject => {
					const { msgId, msg, sentBy, msgTimestamp } = messages[msgObject];
					return (
						<ChatBubble
							key={msgId}
							msg={msg}
							isMe={sentBy === uuid && true}
							time={formatISO9075(msgTimestamp, { representation: 'time' }).slice(0, 5)}
						/>
					);
				});
			setGeneratedContent(msgBubbles);
		} else if (messages === null) {
			setGeneratedContent('');
		}
	}, [messages, uuid]);

	/* 
	Checks if targeted chatRoom is a groupChat and if the group is deleted.
	If true disables the ChatBoxInput(adds disabled prop) and displays
	a message that the group got deleted.
	*/
	useEffect(() => {
		if (chatBox.targetType === 'groupChat') {
			const targetGroup = groups.filter(group => group.uuid === chatBox.target);
			if (targetGroup[0].isDeleted) {
				setIsDeletedGroup(true);
			} else {
				setIsDeletedGroup(false);
			}
		} else {
			setIsDeletedGroup(false);
		}
	}, [chatBox.id, chatBox.targetType]);

	// Display Chatbox just if layoutContext of ChatBox has a chatId.
	if (chatBox.id) {
		return (
			<Grid item xs={5.7} sm={6.5} md={7} className={classes.chatBox}>
				<ChatBoxHeader />
				<section className={classes.msgWrapper}>
					{generatedContent}
					{isDeletedGroup && (
						<p className={classes.disabledInfo}>This group was deleted</p>
					)}
					<div ref={scrollTargetRef} id='scrollTargetChatBox' />
				</section>

				<ChatBoxInput disabled={isDeletedGroup} />
			</Grid>
		);
	}
	return null;
}

export default ChatBox;
