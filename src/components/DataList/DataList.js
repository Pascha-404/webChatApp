import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import { useUser } from '../../contexts/user.context';
import { useChatsContext } from '../../contexts/chats.context';
import { useLayoutContext } from '../../contexts/layout.context';
import fetchDatabase from '../../utilities/fetchDatabase';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';

function DataList() {
	const user = useUser();
	const chats = useChatsContext();
	const { dataListContent } = useLayoutContext();
	const classes = useStyles();
	const [generatedContent, setGeneratedContent] = useState();

	useEffect(() => {
		if (dataListContent === 'inbox') {
			const generatedChats = chats.map(async (chat, idx) => {
				const contact = chat.members.filter(member => user.uuid !== member);
				const contactFetch = await fetchDatabase(`users/${contact}`);
				const chatId = Object.keys(chats)[idx];
				return (
					<DataCard
						key={chatId}
						chatId={chatId}
						user={contactFetch}
						msg={chat.lastMsg && chat.lastMsg}
						time={chat.timestamp && chat.timestamp}
					/>
				);
			});
			Promise.all(generatedChats)
				.then(results => setGeneratedContent(results))
				.catch(error => console.log(error));
		}
	}, [dataListContent, chats, user.uuid]);

	return (
		<Grid item sm={4} md={4} className={classes.dataList}>
			<SearchForm className={classes.dataListSearchForm} />
			{dataListContent === 'inbox' && <SortForm />}
			{generatedContent}
		</Grid>
	);
}

export default DataList;
