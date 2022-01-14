import React from 'react';
import { InputBase, IconButton, FormConrol, FormControl } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { Picker } from 'emoji-mart';

import useToggleState from '../../hooks/useToggleState';
import useInputState from '../../hooks/useInputState';

import 'emoji-mart/css/emoji-mart.css';
import useStyles from './ChatBoxInput.style';

function ChatBoxInput() {
	const { state, handleChange, handleAddToState, reset } = useInputState('');
	const [showPicker, togglePicker] = useToggleState(false);
	const classes = useStyles({ showPicker });

	return (
		<section className={classes.chatBoxInput}>
			<div className={classes.contentWrapper}>
				<IconButton className={classes.attachIcon}>
					<AttachFileIcon />
				</IconButton>

				<FormControl className={classes.textInput}>
					<InputBase
						placeholder={'Type a Message here...'}
						inputProps={{ 'aria-label': 'Search' }}
						value={state}
						onChange={handleChange}
						autoFocus
					/>
				</FormControl>

				<div className={classes.iconWrapper}>
					<IconButton onClick={togglePicker}>
						<EmojiEmotionsIcon className={classes.emojiIcon} />
					</IconButton>

					<IconButton className={classes.sendIconWrapper}>
						<SendIcon />
					</IconButton>
				</div>
			</div>

			{showPicker && (
				<div className={classes.emojiPicker}>
					<Picker
						showPreview={false}
						showSkinTones={false}
						set={'apple'}
						theme='dark'
						onSelect={emojiObj => {
							handleAddToState(emojiObj.native);
						}}
					/>
				</div>
			)}
		</section>
	);
}

export default ChatBoxInput;
