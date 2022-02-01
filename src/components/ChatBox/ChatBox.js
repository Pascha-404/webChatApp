import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';
import ChatBoxHeader from '../ChatBoxHeader/ChatBoxHeader';
import ChatBubble from '../ChatBubble/ChatBubble';

import useFetchDatabase from '../../services/api/useFetchDatabase';

import useScrollIntoView from '../../hooks/useScrollIntoView';
import { useUser } from '../../contexts/user.context';
import { useLayoutContext } from '../../contexts/layout.context';

import useStyles from './ChatBox.style';

function ChatBox() {
	const classes = useStyles();
	const { uuid } = useUser();
	const { chatBox } = useLayoutContext();
	const [fetchedMessages, isFetching] = useFetchDatabase(`/messages/${chatBox.id}`);
	const [scrollTargetRef] = useScrollIntoView('instant');
	const [generatedContent, setGeneratedContent] = useState();

	useEffect(() => {
		if (!isFetching && fetchedMessages !== null) {
			const msgBubbles = fetchedMessages.map(msgObject => {
				const { msgId, msg, sentBy, timestamp } = msgObject[Object.keys(msgObject)[0]];
				return (
					<ChatBubble
						key={msgId}
						msg={msg}
						isMe={sentBy === uuid && true}
						time={timestamp}
					/>
				);
			});
			setGeneratedContent(msgBubbles);
		} else if (!isFetching && fetchedMessages === null) {
			setGeneratedContent('');
		}
	}, [fetchedMessages]);

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

export default ChatBox;
