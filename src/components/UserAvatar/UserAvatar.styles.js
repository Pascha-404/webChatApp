import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	userAvatar: {
		height: props => `${props.size}rem`,
		width: props => `${props.size}rem`,
		'& .MuiAvatar-root': { width: '100%', height: '100%' },
	},
});

export default useStyles;
