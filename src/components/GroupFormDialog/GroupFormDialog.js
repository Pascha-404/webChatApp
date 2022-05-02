import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Button,
} from '@mui/material';

import { useLayout, useLayoutDispatch } from '../../contexts';

function GroupFormDialog() {
	const { groupDialog } = useLayout();
	const layoutDispatch = useLayoutDispatch();

	function handleCloseDialog() {
		layoutDispatch({ type: 'SHOW_GROUPDIALOG', value: false });
	}

	return (
		<Dialog open={groupDialog} onClose={handleCloseDialog}>
			<DialogTitle>Create a group</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To create a group, please fill out the form. The groupname must be unique.
				</DialogContentText>
				<TextField
					autoFocus
					margin='dense'
					id='name'
					label='Group Name'
					type='text'
					fullWidth
					variant='standard'
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog}>Cancel</Button>
				<Button onClick={handleCloseDialog}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}

export default GroupFormDialog;
