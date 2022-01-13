import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import { MessagesContext } from '../../contexts/messages.context';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import MessageCard from '../MessageCard';

import useStyles from './Inbox.style';

// { userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' }

function Inbox() {
	const savedMessages = useContext(MessagesContext);
	const classes = useStyles();

	const createMessages = array => {
		let createdMessages = [];

		for (let i = 0; i < 15; i++) {
			let randNmbr = Math.floor(Math.random() * array.length);
			createdMessages.push(
				<MessageCard
					key={array[randNmbr].userId + Math.random()}
					userId={array[randNmbr].userId}
					msg={array[randNmbr].chatMessages[0].msg}
					time={array[randNmbr].chatMessages[0].time}
				/>
			);
		}
		return createdMessages;
	};
	const messages = createMessages(savedMessages);
	return (
		<Grid item sm={4} md={4} className={classes.inbox}>
			<SearchForm className={classes.inboxSearchForm} />
			<SortForm />
			<div className={classes.inboxMessages}>{messages}</div>
			{/* {messages.map(msg => (
				<MessageCard
					key={msg.userId}
					userId={msg.userId}
					msg={msg.chatMessages[0].msg}
					time={msg.chatMessages[0].time}
				/>
			))} */}
		</Grid>
	);
}

export default Inbox;
