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

import { useLayout, useLayoutDispatch } from '../../../contexts/layout.context';
import { useUser } from '../../../contexts/user.context';

import UserAvatar from '../../UserAvatar';

import useStyles from './Navbar.style';

// Simple Navbar component to navigate through the app
function Navbar() {
	const layoutDispatch = useLayoutDispatch();
	const layout = useLayout();
	const user = useUser();
	const classes = useStyles();

	return (
		<Grid item xs={2} sm={1.5} md={1} lg={1}>
			<nav className={classes.navbar}>
				<UserAvatar userName={user.displayName} photoURL={user.photoURL} />
				<Tabs
					className={classes.menuIcons}
					orientation='vertical'
					value={layout.dataListContent}
					onChange={(e, newValue) =>
						layoutDispatch({ type: 'SET_DATALISTCONTENT', newValue: newValue })
					}
					aria-label='Navbar options'>
					<Tab icon={<HomeIcon />} aria-label='home' value={'home'} />
					<Tab
						icon={<SendIcon />}
						aria-label='contacts'
						value={'contacts'}
						onClick={() => layoutDispatch({ type: 'SHOW_CONTACTS' })}
					/>
					<Tab
						icon={<InboxIcon />}
						aria-label='inbox'
						value={'inbox'}
						onClick={() => layoutDispatch({ type: 'SHOW_INBOX' })}
					/>
					<Tab icon={<GroupIcon />} aria-label='groups' value={'groups'} />
					<Tab
						icon={<NotificationsIcon />}
						aria-label='Notifications'
						value={'notifications'}
					/>
					<Tab icon={<SettingsIcon />} aria-label='options' value={'options'} />
				</Tabs>
			</nav>
		</Grid>
	);
}

export default Navbar;
