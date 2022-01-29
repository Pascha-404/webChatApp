import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';
import ChatBoxHeader from '../ChatBoxHeader/ChatBoxHeader';
import ChatBubble from '../ChatBubble/ChatBubble';

import useScrollIntoView from '../../hooks/useScrollIntoView';
import { useUser } from '../../contexts/user.context';
import { useLayoutContext } from '../../contexts/layout.context';

import useStyles from './ChatBox.style';

function ChatBox() {
	const classes = useStyles();
	const user = useUser();
	const { chatBoxId } = useLayoutContext();
	const [scrollTargetRef] = useScrollIntoView('instant');
	const chatObject =
		chatBoxId.length > 0 && user.chats.filter(chat => chatBoxId === chat.chatId);
	const messages = chatBoxId.length > 0 && chatObject[0].messages;

	return (
		<Grid item xs={5.7} sm={6.5} md={7} className={classes.chatBox}>
			<ChatBoxHeader />
			<section className={classes.msgWrapper}>
				{chatBoxId &&
					messages.map(msg => {
						return (
							<ChatBubble
								key={msg.msgId}
								msg={msg.msg}
								isMe={msg.userId === user.userId && true}
								time={msg.timestamp}
							/>
						);
					})}
				<div ref={scrollTargetRef} id='scrollTargetChatBox' />
			</section>

			<ChatBoxInput />
		</Grid>
	);
}

export default ChatBox;
