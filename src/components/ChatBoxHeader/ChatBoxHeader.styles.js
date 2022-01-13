import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	chatBoxHeader: {
		paddingTop: '1rem',
		position: 'relative',
		zIndex: '6',
		width: '100%',
		height: '8rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& span': { textAlign: 'left' },
		'& .MuiCardHeader-title': {
			fontWeight: '900',
			fontSize: '18px',
		},
		'& .MuiSvgIcon-root': {
			fontSize: '3.2rem',
		},
	},
	chatBoxData: {
		width: '100%',
		paddingBottom: '0',
	},
});

export default useStyles;
