import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import sortByTimestamp from '../../utilities/sortByTimestamp';
import {
	useContacts,
	useFindContacts,
	useFindContactsDispatch,
} from '../../contexts/contacts.context';
import { useUser } from '../../contexts/user.context';
import { useChats } from '../../contexts/chats.context';
import { useLayout } from '../../contexts/layout.context';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';
import Options from '../Options';
import TabBar from '../TabBar';
import { fetchDatabase } from '../../services/api';

function DataList() {
	const user = useUser();
	const chats = useChats();
	const contacts = useContacts();
	const foundContactsDispatch = useFindContactsDispatch();
	const { foundContacts } = useFindContacts();
	const { dataListContent, dataListTab } = useLayout();
	const classes = useStyles();
	const [generatedContent, setGeneratedContent] = useState([]);

	function handleRefresh() {
		foundContactsDispatch({ type: 'TOGGLE_REFRESH' });
	}

	useEffect(() => {
		async function createContent() {
			if (dataListContent === 'home') {
				setGeneratedContent('');
			} else if (dataListContent === 'inbox') {
				const generatedChats = await Promise.all(
					sortByTimestamp(chats, 'descending').map(
						async ({ members, chatId, lastMsg, timestamp }) => {
							const chatPartner = members.filter(member => user.uuid !== member);
							const contactData = contacts.filter(
								contact => String(chatPartner) === contact.uuid
							);
							if (contactData.length <= 0) {
								const getUser = await fetchDatabase(`/users/${String(chatPartner)}`);
								const { displayName, photoURL, uuid } = getUser;
								contactData.push({ displayName, photoURL, uuid });
							}
							return (
								<DataCard
									key={chatId}
									chatId={chatId}
									target={contactData[0]}
									msg={lastMsg && lastMsg}
									time={timestamp && timestamp}
									type={'chat'}
								/>
							);
						}
					)
				);
				setGeneratedContent(generatedChats);
			} else if (dataListContent === 'contacts') {
				if (dataListTab.contacts === 'existingContacts') {
					const generatedContacts = contacts.map(contact => {
						return <DataCard type={'contact'} key={contact.uuid} target={contact} />;
					});
					setGeneratedContent(generatedContacts);
				} else if (dataListTab.contacts === 'findContacts') {
					const generatedContacts = foundContacts.map(contact => {
						return <DataCard type={'contact'} key={contact.uuid} target={contact} />;
					});
					setGeneratedContent(generatedContacts);
				}
			} else if (dataListContent === 'groups') {
				setGeneratedContent('');
			} else if (dataListContent === 'notifications') {
				setGeneratedContent('');
			} else if (dataListContent === 'options') {
				setGeneratedContent(<Options />);
			}
		}
		createContent();
	}, [chats, dataListContent, user.uuid, contacts, dataListTab, foundContacts]);

	return (
		<Grid item sm={4} md={4} className={classes.dataList}>
			{dataListContent === 'contacts' && (
				<TabBar
					tabType='contacts'
					tabs={[
						{ label: 'Your Contacts', value: 'existingContacts' },
						{ label: 'Find Contact', value: 'findContacts' },
					]}
				/>
			)}
			{dataListContent === 'groups' && (
				<TabBar
					tabType='groups'
					tabs={[
						{ label: 'Your Groups', value: 'existingGroups' },
						{ label: 'Find Group', value: 'findGroups' },
					]}
				/>
			)}
			<div className={classes.inputWrapper}>
				{dataListContent !== 'options' && (
					<SearchForm className={classes.dataListSearchForm} />
				)}
				{dataListTab.contacts === 'findContacts' && (
					<IconButton
						aria-label='refresh'
						className={classes.refreshBtn}
						onClick={handleRefresh}>
						<RefreshIcon />
					</IconButton>
				)}
			</div>
			{dataListContent === 'inbox' && <SortForm />}
			{generatedContent}
		</Grid>
	);
}

export default DataList;
