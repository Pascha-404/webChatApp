import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	dataList: {
		background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 65.34%, #FFFFFF 100%)',
		paddingTop: '2rem',
		height: '100%',
	},
	inboxMessages: {
		width: '100%',
		height: '79%',
		overflowY: 'scroll',
		'&::-webkit-scrollbar': {
			width: '0px',
			height: '0px'
		},
	},
});

export default useStyles;
