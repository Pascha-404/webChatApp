import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';
import SearchForm from '../SearchForm';
import MessageCard from '../MessageCard'

import { MessagesContext } from '../../contexts/messages.context';

// { userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' }

function Inbox() {
    const messages = useContext(MessagesContext)
	return (
		<Grid item sm={4} sx={{ backgroundColor: 'red', paddingTop: '2rem' }}>
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
