import React from 'react';
import { InputBase, IconButton, FormControl } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { Picker } from 'emoji-mart';

import { useUserChatsDispatch } from '../../contexts/chats.context';
import { useMessagesDispatch } from '../../contexts/messages.context';
import { useLayout } from '../../contexts/layout.context';
import { useUser } from '../../contexts/user.context';
import useToggleState from '../../hooks/useToggleState';
import useInputState from '../../hooks/useInputState';

import 'emoji-mart/css/emoji-mart.css';
import useStyles from './ChatBoxInput.style';

function ChatBoxInput() {
	const { state, handleChange, handleAddToState, reset } = useInputState('');
	const [showPicker, togglePicker] = useToggleState(false);
	const classes = useStyles({ showPicker });
	const messagesDispatch = useMessagesDispatch();
	const chatsDispatch = useUserChatsDispatch();
	const { uuid } = useUser();
	const { chatBox } = useLayout();

	return (
		<section className={classes.chatBoxInput}>
			<div className={classes.contentWrapper}>
				<IconButton className={classes.attachIcon}>
					<AttachFileIcon />
				</IconButton>
				<form
					id='chatBoxForm'
					className={classes.chatBoxForm}
					onSubmit={e => {
						e.preventDefault();
						messagesDispatch({
							type: 'ADD_MSG',
							msg: state,
							chatId: chatBox.id,
							userId: uuid,
						});
						chatsDispatch({
							type: 'UPDATE_CHAT',
							chatId: chatBox.id,
							sentBy: uuid,
							msg: state,
						});
						reset();
					}}>
					<FormControl className={classes.textInput}>
						<InputBase
							placeholder={'Type a Message here...'}
							inputProps={{ 'aria-label': 'Search' }}
							value={state}
							onChange={handleChange}
							autoFocus
						/>
					</FormControl>
				</form>

				<div className={classes.iconWrapper}>
					<IconButton onClick={togglePicker}>
						<EmojiEmotionsIcon className={classes.emojiIcon} />
					</IconButton>

					<IconButton
						className={classes.sendIconWrapper}
						type='submit'
						form='chatBoxForm'>
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
