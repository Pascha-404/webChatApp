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
		width: '93%',
		height: '80%',
		padding: '0 1rem',
		overflow: 'scroll',
		'&::-webkit-scrollbar': {
			width: 0,
			height: 0,
		},
	},
});

export default useStyles;
