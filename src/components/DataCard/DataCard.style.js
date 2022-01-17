import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	dataCard: {
		width: '80%',
		backgroundColor: '#fff',
		margin: '0 auto 1.5rem',
		cursor: 'pointer',
		borderRadius: '6px',
		boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.1)',
		'& span': { textAlign: 'left' },
		'& .MuiCardHeader-title': {
			fontWeight: '900',
			fontSize: '18px',
		},
		'& .MuiCardHeader-subheader': {
			fontWeight: '500',
			fontSize: '14px',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			maxWidth: '190px',
			whiteSpace: 'nowrap',
		},
		'& div.MuiCardContent-root': {
			paddingTop: '0',
		},
	},

	// dataBlock: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	justifyContent: 'space-between',
	// },
});

export default useStyles;
