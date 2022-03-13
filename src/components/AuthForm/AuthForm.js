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
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './AuthForm.style';

function AuthForm({ formState }) {
	const classes = useStyles();
	const navigate = useNavigate();
	const [values, setValues] = useState({
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
		});
	};

	const handleGoBack = e => {
		navigate(-1);
	};

	return (
		<section className={classes.authForm}>
			{formState !== 'authType' && (
				<IconButton
					size='medium'
					aria-label='go back'
					onClick={handleGoBack}
					className={classes.backBtn}>
					<ArrowBack fontSize='inherit' />
				</IconButton>
			)}
			{formState === 'authType' && (
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
					<Link to='email'>
						<Button
							variant='contained'
							startIcon={<Email />}
							data-value={'email'}
							onClick={handleSigninMethod}
							className={`${classes.interactionField} emailBtn`}>
							Sign in with Email
						</Button>
					</Link>
					<Button
						variant='contained'
						startIcon={<VisibilityOff />}
						data-value={'anonymously'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} anonymBtn`}>
						Sign in Anonymously
					</Button>
				</React.Fragment>
			)}

			{formState === 'authForm' && (
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
					<FormControlLabel
						className={`${classes.interactionField} radioBtn`}
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
						Dont have an account? <Link to='register'>Register here</Link>
					</Typography>
				</React.Fragment>
			)}
		</section>
	);
}

export default AuthForm;
