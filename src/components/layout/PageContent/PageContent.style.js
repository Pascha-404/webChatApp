import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    pageContent: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#979797',
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        '& .MuiGrid-item.MuiGrid-root': {
            padding: 0,
            height: '100%'
        }
	},
});

export default useStyles;