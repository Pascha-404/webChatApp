import React from 'react';
import useStyles from './ChatBubble.style';

// Simple component to display chatMessages
function ChatBubble(props) {
	const classes = useStyles(props);
	const { msg, time } = props;

	return (
		<React.Fragment>
			<div className={classes.chatBubble}>
				<p>{msg}</p>
				<p className={classes.timeSend}>{time}</p>
			</div>
			<div className={classes.clear} />
		</React.Fragment>
	);
}

export default ChatBubble;
