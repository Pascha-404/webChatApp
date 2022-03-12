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
	Radio,
	FormControlLabel,
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
		email: '',
		password: '',
		rememberMe: false,
		showPassword: false,
	});

	const handleChange = prop => event => {
		if (typeof values[prop] === 'boolean') {
			setValues({ ...values, [prop]: !values[prop] });
		} else {
			setValues({ ...values, [prop]: event.target.value });
		}
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
				<IconButton
					size='medium'
					aria-label='go back'
					onClick={handleGoBack}
					className={classes.backBtn}>
					<ArrowBack fontSize='inherit' />
				</IconButton>
			)}
			{values.formState === 'loginType' && (
				<React.Fragment>
					<Typography className={classes.heading}>Sign in to start messaging</Typography>
					<Button
						variant='contained'
						startIcon={<Google />}
						data-value={'google'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} googleBtn`}>
						Sign in with Google
					</Button>
					<Button
						variant='contained'
						startIcon={<GitHub />}
						data-value={'github'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} gitHubBtn`}>
						Sign in with GitHub
					</Button>
					<Button
						variant='contained'
						startIcon={<Email />}
						data-value={'email'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} emailBtn`}>
						Sign in with Email
					</Button>
					<Button
						variant='contained'
						startIcon={<VisibilityOff />}
						data-value={'anonymously'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} anonymBtn`}>
						Sign in Anonymously
					</Button>
					<Typography align='center' type='caption' component='div' gutterBottom>
						Dont have an account? Register here
					</Typography>
				</React.Fragment>
			)}

			{values.formState === 'loginForm' && (
				<React.Fragment>
					<Typography className={classes.heading}>Sign in with Email</Typography>
					<TextField
						label='E-Mail'
						autoFocus
						id='outlined-start-adornment'
						onChange={handleChange('email')}
						className={classes.interactionField}
					/>
					<FormControl className={classes.interactionField} variant='outlined'>
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
					<FormControlLabel className={`${classes.interactionField} radioBtn`}
						control={
							<Radio checked={values.rememberMe} onClick={handleChange('rememberMe')} />
						}
						label='Remember me'
					/>
					<Button
						variant='contained'
						className={`${classes.interactionField} confirmBtn`}>
						Sign In
					</Button>

					<Typography align='center' type='caption' component='div' gutterBottom>
						Dont have an account? Register here
					</Typography>
				</React.Fragment>
			)}
		</section>
	);
}

export default LoginForm;
