import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';
import ChatBoxHeader from '../ChatBoxHeader/ChatBoxHeader';
import ChatBubble from '../ChatBubble/ChatBubble';

import useScrollIntoView from '../../hooks/useScrollIntoView';
import { UserContext } from '../../contexts/user.context';

import useStyles from './ChatBox.style';

function ChatBox({chatId}) {
	const classes = useStyles();
	const user = useContext(UserContext);
	const [scrollTargetRef] = useScrollIntoView('instant');

let messages = []
	
	return (
		<Grid item xs={5.7} sm={6.5} md={7} className={classes.chatBox}>
			<ChatBoxHeader />
			<section className={classes.msgWrapper}>
				{chatId && messages.map(msg => {
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
