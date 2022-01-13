import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	chatBoxInput: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: '4.5rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
		boxShadow: '0px -8px 30px rgba(0, 0, 0, 0.05)',
		zIndex: '10',
	},
	contentWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '3rem',
		width: '100%',
	},
	attachIcon: {
		'&.MuiButtonBase-root': {
			height: '100%',
			backgroundColor: '#F1EDED',
			borderRadius: '24px 0 0 24px',
			'& svg': { transform: 'rotate(45deg)' },
		},
	},
	textInput: {
		width: '60%',
		height: '100%',
		backgroundColor: '#F1EDED',
		paddingLeft: '1rem',
	},
	iconWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100%',
		width: '20%',
		backgroundColor: '#F1EDED',
		borderRadius: '0 24px 24px 0',
	},
	sendIcon: {
		'&.MuiButtonBase-root': {
			transform: 'scale(1.4) rotate(0deg)',
			color: '#fff',
			backgroundColor: 'red',
			transition: 'transform 200ms ease-out',
			'&:hover': {
				backgroundColor: 'red',
				transform: 'scale(1.4) rotate(-40deg)',
			},
		},
	},
});

export default useStyles;
