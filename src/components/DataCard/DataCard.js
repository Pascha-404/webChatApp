import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

import { useLayoutDispatch } from '../../contexts/layout.context';
import useLayoutReducer from '../../hooks/useLayoutReducer';

function DataCard({ user, time, msg, chatId }) {
	const classes = useStyles();
	const layoutDispatch = useLayoutReducer();
	const userName = user.firstName + ' ' + user.lastName;

	return (
		<Card
			className={classes.dataCard}
			onClick={() => layoutDispatch({ type: 'SET_CHATBOX', id: chatId })}>
			<CardHeader
				avatar={<UserAvatar userName={userName} imgUrl={user.pictureLink} />}
				title={userName}
				subheader={msg && Object.values(msg)[0]}
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
