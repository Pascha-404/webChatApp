import { Box, Tabs, Tab } from '@mui/material';
import React from 'react';

import useInputState from '../../hooks/useInputState';

import useStyles from './TabBar.style';

function TabBar() {
	const classes = useStyles();
	const { state, handleExplChange } = useInputState('existingContacts');
	return (
		<Box className={classes.tabBar}>
			<Tabs value={state} onChange={handleExplChange} centered>
				<Tab label='Your Contacts' value='existingContacts' />
				<Tab label='Find Contact' value='findContacts' />
			</Tabs>
		</Box>
	);
}

export default TabBar;
