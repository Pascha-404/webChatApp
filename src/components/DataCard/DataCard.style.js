import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	dataCard: {
		width: '80%',
		height: '7rem',
		margin: '0 auto 1.5rem',
		cursor: 'pointer',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
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
			color: props => props.isActive && '#fff',
		},
		'& div.MuiCardContent-root': {
			paddingTop: '0',
		},
		'& .MuiCardHeader-root': {
			backgroundColor: props => (props.isActive === true ? '#292F4C' : '#fff'),
			color: props => props.isActive && '#fff',
			borderLeft: props => props.isActive && '4px solid rgb(244, 74, 74)',
			height: '100%',
			width: '100%',
		},
		'& .MuiCardHeader-action .MuiButtonBase-root': {
			color: props => props.isActive && '#fff',
		},
	},
});

export default useStyles;
