import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Simple component to display a overlay with a loading backdrop
function Loading() {
	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
			open={true}>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
}

export default Loading;
