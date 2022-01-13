import React from 'react';
import Avatar from '@mui/material/Avatar';

import useStyles from './UserAvatar.styles';

function UserAvatar({ size = 3 }) {
	const classes = useStyles({ size });
	return (
		<div className={classes.userAvatar}>
			<Avatar />
		</div>
	);
}

export default UserAvatar;
