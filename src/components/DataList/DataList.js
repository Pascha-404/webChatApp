import React, { useContext } from 'react';
import { Grid } from '@mui/material';

import { UserContext } from '../../contexts/user.context';

import SearchForm from '../SearchForm';
import SortForm from '../SortForm/SortForm';
import DataCard from '../DataCard';

import useStyles from './DataList.style';

function DataList() {
	const user = useContext(UserContext);
	const classes = useStyles();

	return (
		<Grid item sm={4} md={4} className={classes.dataList}>
			<SearchForm className={classes.dataListSearchForm} />
			<SortForm />
			<div className={classes.inboxMessages}>
				{user &&
					user.chats.map(chat => (
						<DataCard
							key={chat.chatId}
							userId={chat.members.filter(member => member !== user.userId).toString()}
							msg={chat.messages[0].msg}
							time={chat.messages[0].timestamp}
						/>
					))}
			</div>
		</Grid>
	);
}

export default DataList;
