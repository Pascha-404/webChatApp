import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Box, Tabs, Tab } from '@mui/material';

import useInputState from '../../hooks/useInputState';

import useStyles from './TabBar.style';
import { useLayout, useLayoutDispatch } from '../../contexts/layout.context';

/* 
TabBar component to generate a bar with different tabs.
Takes tabType("groups" or "contacts") and a tabs array of 
objects ([{label:'Contacts', value:'userContacts'},]).
*/
function TabBar({ tabType, tabs }) {
	const classes = useStyles();
	const { dataListTab } = useLayout();
	const layoutDispatch = useLayoutDispatch();
	const { state, handleExplChange } = useInputState(
		dataListTab[tabType] || tabs[0].value
	);

	// After change of TabState, set new Value in layoutContext under tabType key.
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
