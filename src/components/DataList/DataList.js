import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import sortByTimestamp from '../../utilities/sortByTimestamp';
import {
	useUser,
	useUserChats,
	useLayout,
	useContacts,
	useFindContacts,
	useFindContactsDispatch,
	useGroups,
	useGroupChats,
	useFindGroups,
	useFindGroupsDispatch,
} from '../../contexts';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';
import Options from '../Options';
import TabBar from '../TabBar';

function DataList() {
	const user = useUser();
	const userChats = useUserChats();
	const groupChats = useGroupChats();
	const groups = useGroups();
	const { foundGroups } = useFindGroups();
	const foundGroupsDispatch = useFindGroupsDispatch();
	const contacts = useContacts();
	const foundContactsDispatch = useFindContactsDispatch();
	const { foundContacts } = useFindContacts();
	const { dataListContent, dataListTab } = useLayout();
	const classes = useStyles();
	const [generatedContent, setGeneratedContent] = useState([]);
	const hasRefreshBtn =
		(dataListContent === 'contacts' && dataListTab.contacts === 'findContacts') ||
		(dataListContent === 'groups' && dataListTab.groups === 'findGroups');

	function handleRefresh() {
		if (dataListContent === 'contacts') {
			foundContactsDispatch({ type: 'TOGGLE_REFRESH' });
		} else if (dataListContent === 'groups') {
			foundGroupsDispatch({ type: 'TOGGLE_REFRESH' });
		}
	}

	useEffect(() => {
		async function createContent() {
			if (dataListContent === 'home') {
				setGeneratedContent('');
			} else if (dataListContent === 'inbox') {
				const generatedChats = await Promise.all(
					sortByTimestamp([userChats, groupChats], 'descending').map(
						async ({ type, members, chatId, lastMsg, timestamp }) => {
							if (type === 'userChat') {
								const chatPartner = members.filter(member => user.uuid !== member);
								const contactData = contacts.filter(
									contact => String(chatPartner) === contact.uuid
								);
								return (
									<DataCard
										key={chatId}
										chatId={chatId}
										target={contactData[0]}
										msg={lastMsg && lastMsg}
										time={timestamp && timestamp}
										cardType={'userChat'}
									/>
								);
							} else if (type === 'groupChat') {
								const targetGroup = groups.filter(group => group.chatId === chatId);
								return (
									<DataCard
										key={chatId}
										chatId={chatId}
										target={targetGroup[0]}
										msg={lastMsg && lastMsg}
										time={timestamp && timestamp}
										cardType={'groupChat'}
									/>
								);
							}
						}
					)
				);
				setGeneratedContent(generatedChats);
			} else if (dataListContent === 'contacts') {
				if (dataListTab.contacts === 'existingContacts') {
					const generatedContacts = contacts
						.filter(contact => contact.isFriend === true)
						.map(contact => {
							return (
								<DataCard cardType={'contact'} key={contact.uuid} target={contact} />
							);
						});
					setGeneratedContent(generatedContacts);
				} else if (dataListTab.contacts === 'findContacts') {
					const generatedContacts = foundContacts.map(contact => {
						return <DataCard cardType={'contact'} key={contact.uuid} target={contact} />;
					});
					setGeneratedContent(generatedContacts);
				}
			} else if (dataListContent === 'groups') {
				if (dataListTab.groups === 'existingGroups') {
					const generatedGroups = groups.map(group => {
						return <DataCard cardType='group' key={group.uuid} target={group} />;
					});
					setGeneratedContent(generatedGroups);
				} else if (dataListTab.groups === 'findGroups') {
					const generatedGroups = foundGroups.map(group => {
						return <DataCard cardType='group' key={group.uuid} target={group} />;
					});
					setGeneratedContent(generatedGroups);
				}
			} else if (dataListContent === 'notifications') {
				setGeneratedContent('');
			} else if (dataListContent === 'options') {
				setGeneratedContent(<Options />);
			}
		}
		createContent();
	}, [
		userChats,
		dataListContent,
		user.uuid,
		contacts,
		dataListTab,
		foundContacts,
		groups,
		groupChats,
	]);

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
				{hasRefreshBtn && (
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
