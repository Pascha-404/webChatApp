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
});

export default useStyles;
