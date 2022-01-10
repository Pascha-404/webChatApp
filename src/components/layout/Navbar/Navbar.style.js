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
			"& .MuiSvgIcon-root": { fontSize: "30px"},
		},
		'& .Mui-selected': { opacity: '1' },
		'& .MuiTabs-indicator': {
			right: null,
			left: 0,
			width: '26px',
			background: 'rgb(255,0,0)',
			background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(41,47,76,0.1) 100%)',
		},
    },
    menuIcon: {
        height: '24px',
        width: '100%'
    }
});

export default useStyles;
