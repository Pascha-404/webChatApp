import React from 'react';
import { CardContent, Card, Typography, CardHeader, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UserAvatar';
import useStyles from './MessageCard.style';

// { userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' }

function MessageCard({ userId, date, time, msg }) {
	const classes = useStyles();
	return (
		<Card className={classes.messageCard}>
			<CardHeader
				avatar={<UserAvatar />}
				title={'Bjoern Bjoernsen'}
				subheader={msg}
				action={
					<IconButton>
						<ExpandMoreIcon />
					</IconButton>
				}
			/>
			{/* <CardContent>
				<div className={classes.dataBlock}>
					<Typography variant='body2'>{msg}</Typography>
					<Typography variant='body2'>5</Typography>
				</div>
			</CardContent> */}
		</Card>
	);
}

export default MessageCard;
