import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	searchForm: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '65%',
		height: '3rem',
		margin: '2rem auto 1.3rem',
		backgroundColor: '#F1EDED',
		borderRadius: '24px',
		paddingLeft: '1rem',
	},
	searchIcon: {
		color: '#DADADA',
	},
	searchInput: {
		marginLeft: '0.8rem',
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

export default useStyles;