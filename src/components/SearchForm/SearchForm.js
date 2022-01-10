import React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './SearchForm.style';

function SearchForm() {
	const classes = useStyles();
	return (
		<div className={classes.searchForm}>
			<SearchIcon className={classes.searchIcon}/>
			<InputBase
				className={classes.searchInput}
				placeholder={'Enter for Search...'}
				inputProps={{ 'aria-label': 'Search' }}
			/>
		</div>
	);
}

export default SearchForm;
