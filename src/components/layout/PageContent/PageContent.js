import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

function PageContent({ children }) {
	const styles = {
		height: '100vh',
		width: '100vw',
		backgroundColor: '#979797',
		display: 'flex',
		flexGrow: 1,
	};
	return (
		<Box sx={styles}>
			<Grid container spacing={2}>
				{children}
			</Grid>
		</Box>
	);
}

export default PageContent;
