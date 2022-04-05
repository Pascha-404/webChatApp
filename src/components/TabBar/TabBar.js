import React from 'react';
import {v4 as uuid} from 'uuid'
import { Box, Tabs, Tab } from '@mui/material';

import useInputState from '../../hooks/useInputState';

import useStyles from './TabBar.style';

function TabBar({ tabs }) {
	const classes = useStyles();
	const { state, handleExplChange } = useInputState(tabs[0].value);
	return (
		<Box className={classes.tabBar}>
			<Tabs value={state} onChange={handleExplChange} centered>
				{tabs.map(tab => {
					return <Tab label={tab.label} value={tab.value} key={`tab-${uuid()}`} />;
				})}
			</Tabs>
		</Box>
	);
}

export default TabBar;
