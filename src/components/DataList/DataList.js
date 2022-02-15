import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import sortByTimestamp from '../../utilities/sortByTimestamp';
import { useContacts } from '../../contexts/contacts.context';
import { useUser } from '../../contexts/user.context';
import { useChats } from '../../contexts/chats.context';
import { useLayout } from '../../contexts/layout.context';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';

function DataList() {
	const user = useUser();
	const chats = useChats();
	const contacts = useContacts();
	const { dataListContent } = useLayout();
	const classes = useStyles();
	const [generatedContent, setGeneratedContent] = useState();

	useEffect(() => {
		if (dataListContent === 'inbox') {
			const generatedChats = sortByTimestamp(chats, 'descending').map(chat => {
				const chatPartner = chat.members.filter(member => user.uuid !== member);
				const contactData = contacts.filter(
					contact => String(chatPartner) === contact.uuid
				);
				return (
					<DataCard
						key={chat.chatId}
						chatId={chat.chatId}
						target={contactData[0]}
						msg={chat.lastMsg && chat.lastMsg}
						time={chat.timestamp && chat.timestamp}
						type={'chat'}
					/>
				);
			});
			setGeneratedContent(generatedChats);
		} else if (dataListContent === 'contacts') {
			const generatedChats = contacts.map(contact => {
				return <DataCard type={'contact'} key={contact.uuid} target={contact} />;
			});
			setGeneratedContent(generatedChats);
		}
	}, [chats, dataListContent, user.uuid, contacts]);

	return (
		<Grid item sm={4} md={4} className={classes.dataList}>
			<SearchForm className={classes.dataListSearchForm} />
			{dataListContent === 'inbox' && <SortForm />}
			{generatedContent}
		</Grid>
	);
}

export default DataList;
