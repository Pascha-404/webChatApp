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

import useInputState from '../../../hooks/useInputState';

import UserAvatar from '../../UserAvatar';

function Navbar() {
	const { state, handleExplChange } = useInputState('home');

	const styles = {
		height: '100%',
		width: '10%',
		backgroundColor: '#181C2F',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
	};

	return (
		<nav style={styles}>
			<UserAvatar />
			<Tabs
				indicatorColor='secondary'
				textColor='secondary'
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
	);
}

export default Navbar;
