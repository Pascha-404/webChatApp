import { createUseStyles } from 'react-jss';

const textFontsize = {
	mailIcon: '73px',
	heading: '2.5rem',
	normalText: '1.125rem',
	listIcon: '30px',
};

const useStyles = createUseStyles({
	descriptionSide: { backgroundColor: '#292F4C', color: '#fff' },
	descriptionContainer: { width: '70%' },
	mailIcon: {
		'&.MuiSvgIcon-root': {
			fontSize: textFontsize.mailIcon,
			color: '#F44A4A',
			marginBottom: '0.6rem',
		},
	},
	heading: {
		'&.MuiTypography-root': {
			fontSize: textFontsize.heading,
			marginBottom: '2.5rem',
			marginLeft: '0.8rem',
		},
	},
	listItem: {
		marginBottom: '1.1rem',
		'& .MuiTypography-root': { fontSize: textFontsize.normalText },
	},
	listIcon: {
		'&.MuiListItemIcon-root .MuiSvgIcon-root': {
			fontSize: textFontsize.listIcon,
			fontWeight: '700',
			color: '#F44A4A',
		},
	},
	bottomParagraph: {
		'&.MuiTypography-root': {
			marginTop: '4rem',
			marginLeft: '0.8rem',
			fontSize: textFontsize.normalText,
		},
	},
	formSide: { backgroundColor: '#F2F2F2' },
});

export default useStyles;
