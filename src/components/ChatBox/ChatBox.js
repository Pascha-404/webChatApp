import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';
import ChatBubble from '../ChatBubble/ChatBubble';

import { MessagesContext } from '../../contexts/messages.context';
import useScrollIntoView from '../../hooks/useScrollIntoView';

import useStyles from './ChatBox.style';

function ChatBox() {
	const classes = useStyles();
	const allMessages = useContext(MessagesContext);
	const messages = allMessages[0].chatMessages;
	const [scrollTargetRef] = useScrollIntoView('instant');
	return (
		<Grid item sm={5} className={classes.chatBox}>
			<section className={classes.msgWrapper}>
				{messages.map(msg => {
					return (
						<ChatBubble
							key={Math.random() * 9999}
							msg={msg.msg}
							isMe={msg.userId === 1 && true}
							time={msg.time}
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
