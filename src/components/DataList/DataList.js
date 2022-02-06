import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import { useUser } from '../../contexts/user.context';
import { useChats } from '../../contexts/chats.context';
import { useLayout } from '../../contexts/layout.context';
import fetchDatabase from '../../services/api/fetchDatabase';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';

function DataList() {
	const user = useUser();
	const chats = useChats();
	const { dataListContent } = useLayout();
	const classes = useStyles();
	const [generatedContent, setGeneratedContent] = useState();
	useEffect(() => {
		if (dataListContent === 'inbox') {
			const generatedChats = chats.map(async chat => {
				const contact = chat.members.filter(member => user.uuid !== member);
				const contactFetch = await fetchDatabase(`users/${contact}`);
				return (
					<DataCard
						key={chat.chatId}
						chatId={chat.chatId}
						target={contactFetch}
						msg={chat.lastMsg && chat.lastMsg}
						time={chat.timestamp && chat.timestamp}
					/>
				);
			});
			Promise.all(generatedChats)
				.then(results => setGeneratedContent(results))
				.catch(error => console.log(error));
		}
	}, [chats, dataListContent, user.uuid]);

	return (
		<Grid item sm={4} md={4} className={classes.dataList}>
			<SearchForm className={classes.dataListSearchForm} />
			{dataListContent === 'inbox' && <SortForm />}
			{generatedContent}
		</Grid>
	);
}

export default DataList;
