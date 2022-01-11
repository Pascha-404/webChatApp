import React from 'react';
import { Grid } from '@mui/material';
import ChatBoxInput from '../ChatBoxInput';

import useStyles from './ChatBox.style';

function ChatBox() {
	const classes = useStyles();
	return (
		<Grid item sm={5} className={classes.chatBox}>
			<ChatBoxInput />
		</Grid>
	);
}

export default ChatBox;
