import React from 'react';
import Avatar from '@mui/material/Avatar';

import useStyles from './UserAvatar.styles';

/* 
UserAvatar Component to display the user/group picture.
Takes 3 properties:
Size is by default 3rem but can be changed to any wiched rem size.
PhotoURL should contain a link to the uploaded photo.
UserName fills the alt attribute of the Avatar Component for accessibility.
*/
function UserAvatar({ size = 3, photoURL, userName }) {
	const classes = useStyles({ size });
	return (
		<div className={classes.userAvatar}>
			<Avatar alt={userName} src={photoURL !== false ? photoURL : null} />
		</div>
	);
}

export default UserAvatar;
