import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import useStyles from './SortForm.style';

function SortForm() {
	const classes = useStyles();
	return (
		<div className={classes.sortForm}>
			<Typography paragraph={true}>Sort By:</Typography>
			<FormControl>
				<InputLabel id='sort-label' className={classes.sortLabel}>Sort</InputLabel>
				<Select
					variant='standard'
					labelId='sort-label'
					id='sort-select'
					value={"latest"}
					label='Sort'>
					<MenuItem value={"latest"}>Latest First</MenuItem>
					<MenuItem value={"name"}>Name</MenuItem>
					<MenuItem value={"oldest"}>Oldest first</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

export default SortForm;
