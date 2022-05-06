import React from 'react';
import Avatar from '@mui/material/Avatar';

import useStyles from './UserAvatar.styles';

function UserAvatar({ size = 3, photoURL, userName }) {
	const classes = useStyles({ size });
	return (
		<div className={classes.userAvatar}>
			<Avatar alt={userName} src={photoURL !== false ? photoURL : null} />
		</div>
	);
}

export default UserAvatar;
