import React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';



function SearchForm() {
	return (
		<>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder='Search...'
				inputProps={{ 'aria-label': 'Search' }}
			/>
			<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
				<SearchIcon />
			</IconButton>
		</>
	);
}

export default SearchForm;
