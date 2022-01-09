import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	messageCard: {
		width: '80%',
        backgroundColor: '#fff',
        margin: '0 auto 1.5rem',
		cursor: 'pointer',
		borderRadius: '6px',
		boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.1)"
	},
	dataBlock: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default useStyles;