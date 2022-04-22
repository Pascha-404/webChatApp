import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';
import ChatBoxHeader from '../ChatBoxHeader/ChatBoxHeader';
import ChatBubble from '../ChatBubble/ChatBubble';

import { formatISO9075 } from 'date-fns';
import useScrollIntoView from '../../hooks/useScrollIntoView';
import { useUser, useLayout, useMessages } from '../../contexts';

import useStyles from './ChatBox.style';

function ChatBox() {
	const { chatBox } = useLayout();
	const classes = useStyles();
	const { uuid } = useUser();
	const messages = useMessages();
	const [scrollTargetRef] = useScrollIntoView('instant');
	const [generatedContent, setGeneratedContent] = useState();

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

	if (chatBox.id) {
		return (
			<Grid item xs={5.7} sm={6.5} md={7} className={classes.chatBox}>
				<ChatBoxHeader />
				<section className={classes.msgWrapper}>
					{generatedContent}
					<div ref={scrollTargetRef} id='scrollTargetChatBox' />
				</section>

				<ChatBoxInput />
			</Grid>
		);
	}
	return null;
}

export default ChatBox;
