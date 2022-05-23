import React from 'react';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../../contexts/auth.context';

import useStyles from './Options.style';

/* 
Component to display App Options.
Change DisplayName, Avatar Photo or LogOut from here.
*/
function Options() {
	const authDispatch = useAuthDispatch();
	const navigate = useNavigate();
	const classes = useStyles();

	// Handler for signOut and navigate back to AuthPage.
	function handleSignout() {
		authDispatch({ type: 'SIGNOUT' });
		navigate('/auth');
	}

	return (
		<section className={classes.options}>
			<Button
				className={`${classes.interactionField} signoutBtn`}
				onClick={handleSignout}>
				Signout
			</Button>
		</section>
	);
}

export default Options;
