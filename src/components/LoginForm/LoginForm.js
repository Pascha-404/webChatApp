import React, { useState } from 'react';
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	TextField,
	Button,
	Typography,
} from '@mui/material';
import {
	Google,
	GitHub,
	Email,
	VisibilityOff,
	Visibility,
	ArrowBack,
} from '@mui/icons-material';
import useStyles from './LoginForm.style';

function LoginForm() {
	const classes = useStyles();
	const [values, setValues] = useState({
		formState: 'loginType',
		lastFormState: '',
		signInType: '',
		password: '',
		showPassword: false,
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleSigninMethod = e => {
		const { value } = e.currentTarget.dataset;
		setValues({
			...values,
			signInType: value,
			formState: 'loginForm',
			lastFormState: values.formState,
		});
	};

	const handleGoBack = e => {
		setValues({
			...values,
			formState: values.lastFormState,
			lastFormState: values.formState,
		});
	};

	return (
		<section className={classes.loginForm}>
			{values.formState !== 'loginType' && (
				<IconButton aria-label='go back' onClick={handleGoBack}>
					<ArrowBack />
				</IconButton>
			)}
			{values.formState === 'loginType' && (
				<React.Fragment>
					<h2 className={classes.heading}>Sign in to start messaging</h2>
					<Button
						variant='contained'
						startIcon={<Google />}
						data-value={'google'}
						onClick={handleSigninMethod}
						className={`${classes.signInBtn} googleBtn`}>
						Sign in with Google
					</Button>
					<Button
						variant='contained'
						startIcon={<GitHub />}
						data-value={'github'}
						onClick={handleSigninMethod}
						className={`${classes.signInBtn} gitHubBtn`}>
						Sign in with GitHub
					</Button>
					<Button
						variant='contained'
						startIcon={<Email />}
						data-value={'email'}
						onClick={handleSigninMethod}
						className={`${classes.signInBtn} emailBtn`}>
						Sign in with Email
					</Button>
					<Button
						variant='contained'
						startIcon={<Visibility />}
						data-value={'anonymously'}
						onClick={handleSigninMethod}
						className={`${classes.signInBtn} anonymBtn`}>
						Sign in Anonymously
					</Button>
					<Typography align='center' type='caption' component='div' gutterBottom>
						Dont have an account? Register here
					</Typography>
				</React.Fragment>
			)}

			{values.formState === 'loginForm' && (
				<React.Fragment>
					<TextField
						label='E-Mail'
						id='outlined-start-adornment'
						sx={{ m: 1, width: '25ch' }}
					/>
					<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password'
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Password'
						/>
					</FormControl>
					<Button variant='contained'>Sign In</Button>
					<Typography align='center' type='caption' component='div' gutterBottom>
						Dont have an account? Register here
					</Typography>
				</React.Fragment>
			)}
		</section>
	);
}

export default LoginForm;
