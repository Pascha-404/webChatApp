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
	Alert,
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

/* 
Form Component which is displayed on the right side of the loginPage.
Gets formState and authType props through path which is declared in Routes.js file.
*/
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

	/* 
	Checks if given property(key) in 'values' state has a boolean value
	If true it gets changed to the opposite of what it is right now
	If false it is a string value and gets replaced with the event target value
	*/
	const handleChange = prop => event => {
		if (typeof values[prop] === 'boolean') {
			setValues({ ...values, [prop]: !values[prop] });
		} else {
			setValues({ ...values, [prop]: event.target.value });
		}
	};

	// Handler for the visibility of the typed in password
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	// Handler for setting the state to the given data-value prop of each authType button
	const handleSigninMethod = e => {
		const { value } = e.currentTarget.dataset;
		setSignInType(value);
	};

	/* 
	Handler for the goBack arrow button
	Navigates back to last path and resets loginId + password in state 
	Resets error state in the auth context
	*/
	const handleGoBack = e => {
		authDispatch({ type: 'SET_STATE', state: { error: false, errorCode: '' } });
		setValues({ ...values, loginId: '', password: '' });
		navigate(-1);
	};

	/* 
	Handler for the confirm button in the anonymous authentication,
	register via email or login via email. Takes needed state (loginId, password and/or rememberMe)
	and calls in the auth context the needed dispatch type.
	*/
	const handleConfirm = () => {
		if (authType === 'authAnonym') {
			authDispatch({ type: 'AUTH_ANONYM', loginId: values.loginId });
		} else if (authType === 'regEmail') {
			authDispatch({
				type: 'AUTH_EMAIL',
				loginId: values.loginId,
				password: values.password,
				rememberMe: values.rememberMe,
			});
		} else if (authType === 'email') {
			authDispatch({
				type: 'SIGNIN_EMAIL',
				loginId: values.loginId,
				password: values.password,
				rememberMe: values.rememberMe,
			});
		}
	};

	/* 
	Checks if signInType changes to google or github type.
	If true a redirect to the provider gets triggered to authenticate.
	*/
	useEffect(() => {
		if (signInType === 'authGoogle') {
			authDispatch({ type: 'AUTH_GOOGLE' });
		} else if (signInType === 'authGithub') {
			authDispatch({ type: 'AUTH_GITHUB' });
		}
	}, [signInType, authDispatch]);

	return (
		<section className={classes.authForm}>
			{
				// Render goBack button just if authType is chosen
				formState !== 'authType' && (
					<IconButton
						size='medium'
						aria-label='go back'
						onClick={handleGoBack}
						className={classes.backBtn}>
						<ArrowBack fontSize='inherit' />
					</IconButton>
				)
			}
			{formState === 'authType' && (
				<React.Fragment>
					<Typography className={classes.heading}>Sign in to start messaging</Typography>
					<Button
						variant='contained'
						startIcon={<Google />}
						data-value={'authGoogle'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} googleBtn`}>
						Sign in with Google
					</Button>
					<Button
						variant='contained'
						startIcon={<GitHub />}
						data-value={'authGithub'}
						onClick={handleSigninMethod}
						className={`${classes.interactionField} gitHubBtn`}>
						Sign in with GitHub
					</Button>
					<Link to='email' className={classes.unstyleLink}>
						<Button
							variant='contained'
							startIcon={<Email />}
							data-value={'authEmail'}
							onClick={handleSigninMethod}
							className={`${classes.interactionField} emailBtn`}>
							Sign in with Email
						</Button>
					</Link>
					<Link to='anonym' className={classes.unstyleLink}>
						<Button
							variant='contained'
							startIcon={<VisibilityOff />}
							data-value={'authAnonym'}
							onClick={handleSigninMethod}
							className={`${classes.interactionField} anonymBtn`}>
							Sign in Anonymously
						</Button>
					</Link>
				</React.Fragment>
			)}

			{formState === 'authForm' && (
				<React.Fragment>
					{authType !== 'regEmail' && authType !== 'authAnonym' && (
						<Typography className={classes.heading}>Sign in with Email</Typography>
					)}
					{authType === 'regEmail' && (
						<Typography className={classes.heading}>Register with Email</Typography>
					)}
					{authType === 'authAnonym' && (
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

					{(authType === 'email' || authType === 'regEmail') && (
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
						// Disable button if no loginId or password was provided
						disabled={
							values.loginId === '' ||
							(authType === 'email' && values.password === '') ||
							(authType === 'regEmail' && values.password === '')
								? true
								: false
						}>
						{authType === 'regEmail' ? 'Register' : 'Sign In'}
					</Button>

					{authType !== 'regEmail' && (
						<Typography align='center' type='caption' component='div' gutterBottom>
							Dont have an account?{' '}
							<Link
								onClick={() => {
									authDispatch({
										type: 'SET_STATE',
										state: { error: false, errorCode: '' },
									});
									setSignInType('regEmail');
								}}
								to='/auth/email/register'>
								Register here
							</Link>
						</Typography>
					)}
				</React.Fragment>
			)}
			{
				/* 
				Set a errorMessage based on the error state
				If wrong password or user not found display a unspecific message for security reasons
				*/
				error && (
					<Alert severity='error' className={classes.errorAlert}>
						{errorCode === 'auth/email-already-in-use' &&
							'This E-Mail is already beeing used'}
						{(errorCode === 'auth/invalid-email' ||
							errorCode === 'auth/wrong-password' ||
							errorCode === 'auth/internal-error' ||
							errorCode === 'auth/user-not-found') &&
							'E-Mail or password is wrong'}
						{errorCode === 'auth/weak-password' &&
							'Password must be at least 6 characters'}
					</Alert>
				)
			}
		</section>
	);
}

export default AuthForm;
