import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	authForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	backBtn: { '&.MuiButtonBase-root': { alignSelf: 'start' } },
	heading: {
		'&.MuiTypography-root': {
			fontSize: '30px',
			marginBottom: '3.9375rem',
			fontWeight: 700,
		},
	},
	interactionField: {
		'&.MuiButtonBase-root': {
			textTransform: 'none',
			width: '345px',
			height: '54px',
			borderRadius: '10px',
			textAlign: 'center',
			marginBottom: props => (props.authAnonym ? '4rem' : '1.3125rem'),
			fontSize: '20px',
			fontWeight: 700,
			'&.googleBtn': { backgroundColor: '#fff', color: '#000' },
			'&.gitHubBtn': { backgroundColor: '#000', color: '#fff' },
			'&.emailBtn': { backgroundColor: '#F44A4A', color: '#fff' },
			'&.googleBtn': { backgroundColor: '#fff', color: '#000' },
			'&.confirmBtn': { backgroundColor: '#F44A4A' },
		},
		'&.MuiFormControl-root': {
			textTransform: 'none',
			width: '345px',
			height: '54px',
			borderRadius: '10px',
			textAlign: 'center',
			marginBottom: '1.3125rem',
		},
		'&.MuiFormControlLabel-root': {
			alignSelf: 'start',
			marginBottom: '2rem',
		},
	},
	unstyleLink: { textDecoration: 'none' },
});

export default useStyles;
