import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import { UserContext } from '../../contexts/user.context';
import { LayoutContext } from '../../contexts/layout.context';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';

function DataList() {
	const user = useContext(UserContext);
	const { dataListContent } = useContext(LayoutContext);
	const classes = useStyles();
	const hasData = user && dataListContent ? true : false;

	return (
		<Grid item sm={4} md={4} className={classes.dataList}>
			<SearchForm className={classes.dataListSearchForm} />
			{dataListContent === 'inbox' && <SortForm />}

			{hasData && (
				<div className={classes.dataListCards}>
					{dataListContent === 'inbox'
						? user.chats.map(chat => (
								<DataCard
									key={chat.chatId}
									chatId={chat.chatId}
									userId={chat.members
										.filter(member => member !== user.userId)
										.toString()}
									msg={chat.messages[0].msg}
									time={chat.messages[0].timestamp}
								/>
						  ))
						: dataListContent === 'contacts'
						? user.contacts.map(contact => (
								<DataCard
									key={contact.login.uuid}
									userId={contact.login.uuid}
									msg={'Offline'}
								/>
						  ))
						: null}
				</div>
			)}
		</Grid>
	);
}

export default DataList;
