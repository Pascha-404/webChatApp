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
import { useAuthDispatch } from '../../contexts/auth.context';
import useStyles from './AuthForm.style';

function AuthForm({ formState, registerEmail, authAnonym }) {
	const classes = useStyles({ authAnonym });
	const navigate = useNavigate();
	const authDispatch = useAuthDispatch();
	const [values, setValues] = useState({
		loginId: '',
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

	const handleConfirm = async () => {
		const authCase = 'AUTH_' + values.signInType.toUpperCase();
		await authDispatch({ type: authCase, loginId: values.loginId });
		setTimeout(() => {
			navigate('/');
		}, 1000);
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
					<Link to='email' className={classes.unstyleLink}>
						<Button
							variant='contained'
							startIcon={<Email />}
							data-value={'email'}
							onClick={handleSigninMethod}
							className={`${classes.interactionField} emailBtn`}>
							Sign in with Email
						</Button>
					</Link>
					<Link to='anonym' className={classes.unstyleLink}>
						<Button
							variant='contained'
							startIcon={<VisibilityOff />}
							data-value={'anonym'}
							onClick={handleSigninMethod}
							className={`${classes.interactionField} anonymBtn`}>
							Sign in Anonymously
						</Button>
					</Link>
				</React.Fragment>
			)}

			{formState === 'authForm' && (
				<React.Fragment>
					{!registerEmail && !authAnonym && (
						<Typography className={classes.heading}>Sign in with Email</Typography>
					)}
					{registerEmail && (
						<Typography className={classes.heading}>Register with Email</Typography>
					)}
					{authAnonym && (
						<Typography className={classes.heading}>Sign in Anonymously</Typography>
					)}

					<TextField
						label={!authAnonym ? 'E-Mail' : 'Username'}
						autoFocus
						id='outlined-start-adornment'
						onChange={handleChange('loginId')}
						className={classes.interactionField}
					/>

					{!authAnonym && (
						<React.Fragment>
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
									<Radio
										checked={values.rememberMe}
										onClick={handleChange('rememberMe')}
									/>
								}
								label='Remember me'
							/>
						</React.Fragment>
					)}
					<Button
						variant='contained'
						className={`${classes.interactionField} confirmBtn`}
						onClick={handleConfirm}
						disabled={values.loginId === '' && true}>
						{registerEmail ? 'Register' : 'Sign In'}
					</Button>

					{!registerEmail && (
						<Typography align='center' type='caption' component='div' gutterBottom>
							Dont have an account? <Link to='/auth/email/register'>Register here</Link>
						</Typography>
					)}
				</React.Fragment>
			)}
		</section>
	);
}

export default AuthForm;
