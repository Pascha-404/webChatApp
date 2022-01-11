import React from 'react';
import { InputBase, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

import useStyles from './ChatBoxInput.style';

function ChatBoxInput() {
	const classes = useStyles();
	return (
		<section className={classes.chatBoxInput}>
			<div className={classes.contentWrapper}>
				<IconButton className={classes.attachIcon}>
					<AttachFileIcon />
				</IconButton>

				<InputBase
					className={classes.textInput}
					placeholder={'Type a Message here...'}
					inputProps={{ 'aria-label': 'Search' }}
				/>

				<div className={classes.iconWrapper}>
					<IconButton className={classes.emojiIcon}>
						<EmojiEmotionsIcon />
					</IconButton>

					<IconButton className={classes.sendIcon}>
						<SendIcon />
					</IconButton>
				</div>
			</div>
		</section>
	);
}

export default ChatBoxInput;
