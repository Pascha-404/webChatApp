import React from 'react';
import { Card, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './MessageCard.style';


function MessageCard({ userName, date, time, msg, imgUrl }) {
	const classes = useStyles();
	return (
		<Card className={classes.messageCard}>
			<CardHeader
				avatar={<UserAvatar userName={userName} imgUrl={imgUrl} />}
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

export default MessageCard;
