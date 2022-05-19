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
			'&.Mui-disabled': { backgroundColor: '#F1EDED' },
			'& svg': { transform: 'rotate(45deg)' },
		},
	},
	chatBoxForm: { width: '65%', height: '100%' },
	textInput: {
		width: '100%',
		height: '100%',
		backgroundColor: '#F1EDED',
		paddingLeft: '1rem',
		'& .MuiInputBase-root': { height: '100%' },
	},
	iconWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100%',
		width: '6rem',
		backgroundColor: '#F1EDED',
		borderRadius: '0 24px 24px 0',
	},
	emojiIcon: {
		color: props => props.showPicker && '#F44A4A',
		transform: 'color 200ms ease-in',
	},
	sendIconWrapper: {
		'&.MuiButtonBase-root': {
			transform: 'scale(1.4) rotate(0deg)',
			color: '#fff',
			backgroundColor: 'red',
			transition: 'transform 200ms ease-out',
			'&.Mui-disabled': { backgroundColor: 'red', color: 'white' },
			'&:hover': {
				backgroundColor: 'red',
				transform: 'scale(1.4) rotate(-40deg)',
			},
		},
	},
	emojiPicker: {
		position: 'absolute',
		bottom: '100%',
		right: '50%',
		transform: 'translateX(50%)',
	},
});

export default useStyles;
