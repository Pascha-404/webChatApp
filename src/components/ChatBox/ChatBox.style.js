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
		display: 'inline flex',
		flexDirection: 'column',
		width: '93%',
		height: '74%',
		padding: '0 1rem',
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
});

export default useStyles;
