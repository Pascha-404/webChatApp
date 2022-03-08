import React from 'react';
import PageContent from '../layout/PageContent';
import LoginForm from '../LoginForm/LoginForm';
import { Grid } from '@mui/material';

function LoginPage() {
	return (
		<PageContent>
			<Grid item sm={6}></Grid>
			<Grid item sm={6}>
				<LoginForm />
			</Grid>
		</PageContent>
	);
}

export default LoginPage;
