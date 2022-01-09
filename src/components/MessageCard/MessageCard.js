import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserAvatar from '../UserAvatar';

// { userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' }

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

function MessageCard({ userId, date, time, msg }) {
	return (
        <CardContent style={{ width: '80%'}}>
			<div style={style}>
				<UserAvatar />
				<div>
					<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
						{userId}
					</Typography>
					<Typography variant='h5' component='div'></Typography>
					<Typography sx={{ mb: 1.5 }} color='text.secondary'>
						Online Status
					</Typography>
				</div>
                <Typography variant='body2'>{time}</Typography>
			</div>
			<div style={style}>
                <Typography variant='body2'>{msg}</Typography>
				<Typography variant='body2'>5</Typography>
			</div>
		</CardContent>
	);
}

export default MessageCard;
