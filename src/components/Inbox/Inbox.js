import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import { MessagesContext } from '../../contexts/messages.context';

import SearchForm from '../SearchForm';
import MessageCard from '../MessageCard';

import useStyles from './Inbox.style';

// { userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' }

function Inbox() {
	const messages = useContext(MessagesContext);
	const classes = useStyles();
	return (
		<Grid item sm={4} className={classes.inbox}>
			<SearchForm />

			{messages.map(msg => (
				<MessageCard
					key={msg.userId}
					userId={msg.userId}
					msg={msg.chatMessages[0].msg}
					time={msg.chatMessages[0].time}
				/>
			))}
		</Grid>
	);
}

export default Inbox;
