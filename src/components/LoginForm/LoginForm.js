import React, { useState } from 'react';
import {
	Paper,
	MenuList,
	MenuItem,
	ListItemIcon,
	ListItemText,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	TextField,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function LoginForm() {
	const [values, setValues] = useState({
		formState: 'loginType',
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
        const { value } = e.currentTarget.dataset
        setValues({...values, signInType: value, formState: 'loginForm'})
   };
    
	return (
		<Paper sx={{ width: 320, maxWidth: '100%' }}>
			<h1>LoginForm</h1>
			{values.formState === 'loginType' && (
				<MenuList>
					<MenuItem divider={true} data-value={'google'} onClick={handleSigninMethod}>
						<ListItemIcon>
							<GoogleIcon fontSize={'large'} />
						</ListItemIcon>
						<ListItemText>Sign in with Google</ListItemText>
					</MenuItem>
					<MenuItem divider={true} data-value={'github'} onClick={handleSigninMethod}>
						<ListItemIcon>
							<GitHubIcon fontSize={'large'} />
						</ListItemIcon>
						<ListItemText>Sign in with GitHub</ListItemText>
					</MenuItem>
					<MenuItem divider={true} data-value={'email'} onClick={handleSigninMethod}>
						<ListItemIcon>
							<EmailIcon fontSize={'large'} />
						</ListItemIcon>
						<ListItemText>Sign in with Email</ListItemText>
					</MenuItem>
					<MenuItem data-value={'anonymus'} onClick={handleSigninMethod}>
						<ListItemIcon>
							<VisibilityOffIcon fontSize={'large'} />
						</ListItemIcon>
						<ListItemText>Sign in anonymously</ListItemText>
					</MenuItem>
				</MenuList>
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
										{values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							}
							label='Password'
						/>
					</FormControl>
				</React.Fragment>
			)}
		</Paper>
	);
}

export default LoginForm;
