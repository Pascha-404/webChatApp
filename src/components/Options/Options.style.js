import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	options: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	interactionField: {
		'&.MuiButtonBase-root': {
			textTransform: 'none',
			width: '345px',
			height: '54px',
			borderRadius: '10px',
			textAlign: 'center',
			marginBottom: '1.3125rem', 
			fontSize: '20px',
			fontWeight: 700,
			'&.signoutBtn': { backgroundColor: '#F44A4A', color: '#fff' },
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
});

export default useStyles;
