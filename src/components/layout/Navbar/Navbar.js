import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid } from '@mui/material';

import useInputState from '../../../hooks/useInputState';

import UserAvatar from '../../UserAvatar';

import useStyles from './Navbar.style';

function Navbar() {
	const { state, handleExplChange } = useInputState('home');

	const classes = useStyles();

	return (
		<Grid item xs={2} sm={1.5} md={1} lg={1}>
			<nav className={classes.navbar}>
				<UserAvatar />
				<Tabs
					className={classes.menuIcons}
					orientation='vertical'
					value={state}
					onChange={handleExplChange}
					aria-label='Navbar options'>
					<Tab icon={<HomeIcon />} aria-label='Home' value={'home'} />
					<Tab icon={<SendIcon />} aria-label='Send' value={'send'} />
					<Tab icon={<InboxIcon />} aria-label='Inbox' value={'inbox'} />
					<Tab icon={<GroupIcon />} aria-label='Users' value={'users'} />
					<Tab
						icon={<NotificationsIcon />}
						aria-label='Notifications'
						value={'notifications'}
					/>
					<Tab icon={<MoreHorizIcon />} aria-label='Options' value={'options'} />
					<Tab icon={<SettingsIcon />} aria-label='Settings' value={'settings'} />
				</Tabs>
			</nav>
		</Grid>
	);
}

export default Navbar;
