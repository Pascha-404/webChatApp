import React, { useEffect } from 'react';
import {v4 as uuid} from 'uuid'
import { Box, Tabs, Tab } from '@mui/material';

import useInputState from '../../hooks/useInputState';

import useStyles from './TabBar.style';
import { useLayoutDispatch } from '../../contexts/layout.context';

function TabBar({ tabs }) {
    const classes = useStyles();
    const layoutDispatch = useLayoutDispatch();
    const { state, handleExplChange } = useInputState(tabs[0].value);
    
    useEffect(() => {
    layoutDispatch({type: 'SET_DATALISTTAB', state: state})
}, [layoutDispatch, state])

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
