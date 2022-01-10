import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import useStyles from './SortForm.style';

function SortForm() {
	const classes = useStyles();
	return (
		<div className={classes.sortForm}>
			<Typography paragraph={true}>Sort By:</Typography>
			<FormControl>
				<InputLabel id='demo-simple-select-label' className={classes.sortLabel}>Sort</InputLabel>
				<Select
					variant='standard'
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={10}
					label='Age'>
					<MenuItem value={10}>Latest First</MenuItem>
					<MenuItem value={20}>Name</MenuItem>
					<MenuItem value={30}>Oldest first</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

export default SortForm;
