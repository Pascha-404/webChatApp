import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	loginForm: {
		width: '80%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: { fontSize: '30px', marginBottom: '3.9375rem' },
	signInBtn: {
		'&.MuiButtonBase-root': {
			width: '345px',
			height: '54px',
			borderRadius: '10px',
			textAlign: 'center',
			marginBottom: '1.3125rem',
			'&.googleBtn': { backgroundColor: '#fff', color: '#000' },
			'&.gitHubBtn': { backgroundColor: '#000', color: '#fff' },
			'&.emailBtn': { backgroundColor: '#F44A4A', color: '#fff' },
			'&.googleBtn': { backgroundColor: '#fff', color: '#000' },
		},
	},
});

export default useStyles;
