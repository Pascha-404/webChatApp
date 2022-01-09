import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UserAvatar from '../UserAvatar';

import useStyles from './MessageCard.style';

// { userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' }

function MessageCard({ userId, date, time, msg }) {
    const classes = useStyles();
	return (
        <CardContent className={classes.messageCard}>
			<div className={classes.dataBlock}>
				<UserAvatar />
				<div>
					<Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
						{userId}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						Online Status
					</Typography>
				</div>
                <Typography variant='body2'>{time}</Typography>
			</div>
			<div className={classes.dataBlock}>
                <Typography variant='body2'>{msg}</Typography>
				<Typography variant='body2'>5</Typography>
			</div>
		</CardContent>
	);
}

export default MessageCard;
