import React, { useContext } from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

import { UserContext } from '../../contexts/user.context';

function DataCard({ userId, time, msg }) {
	const classes = useStyles();
	const { contacts } = useContext(UserContext);
	const chatPartner = contacts.filter(contact => contact.login.uuid === userId);
	const userName = contacts && chatPartner[0].name.first + ' ' + chatPartner[0].name.last;

	return (
		<Card className={classes.dataCard}>
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
