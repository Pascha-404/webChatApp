import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './DataCard.style';

import { useLayoutDispatch } from '../../contexts/layout.context';

function DataCard({ target, time, msg, chatId }) {
	const classes = useStyles();
	const layoutDispatch = useLayoutDispatch();
	const targetName = target.firstName + ' ' + target.lastName;
	
	return (
		<Card
			className={classes.dataCard}
			onClick={() =>
				layoutDispatch({ type: 'SET_CHATBOX', id: chatId, target: target.uuid })
			}>
			<CardHeader
				avatar={<UserAvatar userName={targetName} imgUrl={target.pictureLink} />}
				title={targetName}
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
