import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import SearchForm from '../SearchForm';

import { MessagesContext } from '../../contexts/messages.context';

function Inbox() {
    const messages = useContext(MessagesContext)
	return (
		<Grid item sm={4} sx={{backgroundColor:'red', paddingTop: '2rem'}}>
            <SearchForm />
		</Grid>
	);
}

export default Inbox;
