import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import useStyles from './PageContent.style';

// Component to apply basic styling to pages
function PageContent({ children }) {
	const classes = useStyles();
	return (
		<Box className={classes.pageContent}>
			<Grid container spacing={2}>
				{children}
			</Grid>
		</Box>
	);
}

export default PageContent;
