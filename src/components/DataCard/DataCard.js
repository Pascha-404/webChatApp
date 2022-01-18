import React, { useContext } from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

import { UserContext } from '../../contexts/user.context';
import { LayoutDispatch } from '../../contexts/layout.context'

function DataCard({ userId, time, msg, chatId }) {
	const classes = useStyles();
	const { contacts } = useContext(UserContext);
	const layoutDispatch = useContext(LayoutDispatch);
	const chatPartner = contacts.filter(contact => contact.login.uuid === userId);
	const userName = contacts && chatPartner[0].name.first + ' ' + chatPartner[0].name.last;

	return (
		<Card className={classes.dataCard} onClick={() => layoutDispatch({type: 'SET_CHATBOX', id: chatId})}>
			<CardHeader
				avatar={
					<UserAvatar userName={userName} imgUrl={chatPartner[0].picture.thumbnail} />
				}
				title={userName}
				subheader={msg}
				action={
					<IconButton>
						<ExpandMoreIcon />
					</IconButton>
				}
			/>
		</Card>
	);
}

export default DataCard;
