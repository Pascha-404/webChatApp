import React from 'react';
import { InputBase, IconButton, FormControl } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SendIcon from '@mui/icons-material/Send';
import { Picker } from 'emoji-mart';

import {
	useUserChatsDispatch,
	useMessagesDispatch,
	useLayout,
	useUser,
	useGroupChatsDispatch,
} from '../../contexts';
import useToggleState from '../../hooks/useToggleState';
import useInputState from '../../hooks/useInputState';

import 'emoji-mart/css/emoji-mart.css';
import useStyles from './ChatBoxInput.style';

/* 
ChatBoxInput component for ChatBox.
Gets disabled prop through ChatBox.
If true changes icon of send button, replaces placeholder in textfield 
and disables everthing clickable.
*/
function ChatBoxInput({ disabled }) {
	const { state, handleChange, handleAddToState, reset } = useInputState('');
	const [showPicker, togglePicker] = useToggleState(false);
	const classes = useStyles({ showPicker });
	const messagesDispatch = useMessagesDispatch();
	const userChatsDispatch = useUserChatsDispatch();
	const groupChatsDispatch = useGroupChatsDispatch();
	const { uuid } = useUser();
	const { chatBox } = useLayout();

	// Handles submit dynamic depending on chatType (triggers different dispatches)
	const handleSubmit = chatType => e => {
		e.preventDefault();
		switch (chatType) {
			case 'userChat':
				messagesDispatch({
					type: 'ADD_MSG',
					msg: state,
					chatId: chatBox.id,
					userId: uuid,
					chatType: 'userChat',
				});
				userChatsDispatch({
					type: 'UPDATE_CHAT',
					chatId: chatBox.id,
					sentBy: uuid,
					msg: state,
				});
				reset();
				break;
			case 'groupChat':
				messagesDispatch({
					type: 'ADD_MSG',
					msg: state,
					chatId: chatBox.id,
					userId: uuid,
					chatType: 'groupChat',
				});
				groupChatsDispatch({
					type: 'UPDATE_CHAT',
					chatId: chatBox.id,
					sentBy: uuid,
					msg: state,
				});
				reset();
				break;
			default:
				console.log('Unknown type!');
				break;
		}
	};

	return (
		<section className={classes.chatBoxInput}>
			<div className={classes.contentWrapper}>
				<IconButton disabled={disabled} className={classes.attachIcon}>
					<AttachFileIcon />
				</IconButton>
				<form
					id='chatBoxForm'
					className={classes.chatBoxForm}
					onSubmit={handleSubmit(chatBox.targetType)}>
					<FormControl className={classes.textInput}>
						<InputBase
							placeholder={
								!disabled
									? 'Type a Message here...'
									: "You can't write into this group..."
							}
							inputProps={{ 'aria-label': 'Search' }}
							value={state}
							onChange={handleChange}
							autoFocus
							disabled={disabled}
						/>
					</FormControl>
				</form>

				<div className={classes.iconWrapper}>
					<IconButton disabled={disabled} onClick={togglePicker}>
						<EmojiEmotionsIcon className={classes.emojiIcon} />
					</IconButton>

					<IconButton
						className={classes.sendIconWrapper}
						type='submit'
						form='chatBoxForm'
						disabled={disabled}>
						{!disabled ? <SendIcon /> : <DoNotDisturbIcon />}
					</IconButton>
				</div>
			</div>

			{
				// Component for adding emojis to state
				showPicker && (
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
				)
			}
		</section>
	);
}

export default ChatBoxInput;
