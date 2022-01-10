import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	sortForm: {
		width: '84%',
		height: '5%',
		display: 'flex',
		alignItems: 'center',
		margin: '0 auto 1.3rem',
		'& p': {
			margin: '0',
			bottom: '0',
            color: '#181C2F',
            opacity: '0.3'
		},
		'& .MuiInput-root': {
			margin: '0 0 0 0.5rem',
		},
	},
	sortLabel: {
		display: 'none',
	},
});

export default useStyles;
