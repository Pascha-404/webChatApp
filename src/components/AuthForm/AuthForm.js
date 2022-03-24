import React, { useEffect, useState } from 'react';
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
import { useAuth, useAuthDispatch } from '../../contexts/auth.context';
import useStyles from './AuthForm.style';

function AuthForm({ formState, authType }) {
	const classes = useStyles({ authType });
	const navigate = useNavigate();
	const authDispatch = useAuthDispatch();
	const { error, errorCode } = useAuth();
	const [values, setValues] = useState({
		loginId: '',
		password: '',
		rememberMe: false,
		showPassword: false,
	});
	const [signInType, setSignInType] = useState(authType);

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
		setSignInType(value);
	};

	const handleGoBack = e => {
		navigate(-1);
	};

	const handleConfirm = () => {
		if (signInType === 'authAnonym') {
			authDispatch({ type: 'AUTH_ANONYM', loginId: values.loginId });
		} else if (signInType === 'regEmail') {
			authDispatch({
				type: 'AUTH_EMAIL',
				loginId: values.loginId,
				password: values.password,
			});
		} else if (signInType === 'email') {
			authDispatch({
				type: 'SIGNIN_EMAIL',
				loginId: values.loginId,
				password: values.password,
			});
		}
	};

	useEffect(() => {
		if (signInType === 'google') {
			authDispatch({ type: 'AUTH_GOOGLE' });
		}
	}, [signInType, authDispatch]);

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
					{signInType !== 'regEmail' && signInType !== 'authAnonym' && (
						<Typography className={classes.heading}>Sign in with Email</Typography>
					)}
					{signInType === 'regEmail' && (
						<Typography className={classes.heading}>Register with Email</Typography>
					)}
					{signInType === 'authAnonym' && (
						<Typography className={classes.heading}>Sign in Anonymously</Typography>
					)}

					<TextField
						label={signInType !== 'authAnonym' ? 'E-Mail' : 'Username'}
						autoFocus
						error={error}
						id='outlined-start-adornment'
						onChange={handleChange('loginId')}
						className={classes.interactionField}
					/>

					{signInType !== 'authEmail' && (
						<React.Fragment>
							<FormControl className={classes.interactionField} variant='outlined'>
								<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
								<OutlinedInput
									id='outlined-adornment-password'
									error={error}
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
						{signInType === 'regEmail' ? 'Register' : 'Sign In'}
					</Button>

					{signInType !== 'regEmail' && (
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
