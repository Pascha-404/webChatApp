import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	chatBox: {
		overflow: 'hidden',
		height: '100%',
		width: '100%',
		position: 'relative',
		backgroundColor: '#EFECE8',
	},
	msgWrapper: {
		flexDirection: 'column',
		height: '72%',
		padding: '1rem 1rem 0',
		marginRight: '0',
		overflow: 'scroll',
		'& #scrollTargetChatBox': {
			clear: 'both',
			float: 'left',
		},
		'&::-webkit-scrollbar': {
			width: 0,
			height: 0,
		},
	},
	disabledInfo: {
		fontFamily: 'Roboto',
		fontSize: '18px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '30px',
		borderRadius: '10px',
		margin: '2rem auto',
		width: '15rem',
		textAlign: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
		color: 'white',
	},
});

export default useStyles;
