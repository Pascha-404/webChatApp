import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	navbar: {
		height: '100%',
		backgroundColor: '#181C2F',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',

	},
	menuIcons: {
		width: '100%',
		'& .MuiTab-root': {
			color: '#fff',
			opacity: '0.3',
			'&:last-of-type': {
				marginTop: '4rem',
			},
			'& .MuiSvgIcon-root': { fontSize: '30px', color: '#fff' },
		},
		'& .Mui-selected': { opacity: '1', color: '#FFF'},
		'& .MuiTabs-indicator': {
			right: null,
			left: 10,
			width: '26px',
			background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(41,47,76,0.1) 100%)',
		}, '& .MuiButtonBase-root': {
			paddingRight: '0',
		}
	},
});

export default useStyles;
