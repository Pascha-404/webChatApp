import React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './SearchForm.style';

/* 
SearchForm Component to search/filter contacts, messages, groups, ... 
Work in progress on that.
*/
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
