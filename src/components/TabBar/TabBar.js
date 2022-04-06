import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Box, Tabs, Tab } from '@mui/material';

import useInputState from '../../hooks/useInputState';

import useStyles from './TabBar.style';
import { useLayout, useLayoutDispatch } from '../../contexts/layout.context';

function TabBar({ tabType, tabs }) {
	const classes = useStyles();
	const { dataListTab } = useLayout();
	const layoutDispatch = useLayoutDispatch();
	const { state, handleExplChange } = useInputState(
		dataListTab[tabType] || tabs[0].value
	);

	useEffect(() => {
		layoutDispatch({ type: 'SET_DATALISTTAB', tabType: tabType, state: state });
	}, [layoutDispatch, state, tabType]);

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
